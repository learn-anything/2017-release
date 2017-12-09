#!/bin/env node
const AWS = require('aws-sdk');
const Bottleneck = require('bottleneck');
const fs = require('fs');
const { resolve } = require('path');
const schemas = require('./schemas');
const timeit = require('../utils/timeit');


// Configure DynamoDB endpoint.
AWS.config.update({
  region: 'us-west-1',
  accessKeyId: 'accessKeyId',
  secretAccessKey: 'secretAccessKey',
  endpoint: new AWS.Endpoint('http://localhost:8000'),
});

if (process.env.NODE_ENV === 'production') {
  AWS.config.update({
    region: 'us-west-1',
    accessKeyId: process.env.DYNAMO_UPDATE_KEY_ID,
    secretAccessKey: process.env.DYNAMO_UPDATE_SECRET_ACCESS_KEY,
    endpoint: null,
  });
}

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

// Convert dynamodb calls to Promises
const dynamo = (method, params) => new Promise((resolve, reject) => {
  dynamodb[method](params, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});


// Convert Item from DynamoDB with info about attribute types to a regular
// object.
//
// Eg.
// const Item = { ID: { N: 10 }, name: { S: 'Some name' } };
// flattenItem(Item);  --> { ID: 10, name: 'Some name'}
const flattenItem = item => Object.keys(item).reduce((flatItem, key) => {
    const val = item[key];

    if (val.M) {
        flatItem[key] = flattenItem(val.M);
    } else if (val.N) {
        flatItem[key] = Number(val.N);
    } else if (val.S) {
        flatItem[key] = val.S;
    } else if (val.NULL) {
        flatItem[key] = null;
    }

    return flatItem;
}, {});

const flattenItems = items => items.map(item => flattenItem(item));


// http://bytesizematters.com/
// Average size in bytes of an Item of a given table.
const estimatedItemSize = {
    'Maps': 300,
    'Nodes': 150,
    'Resources': 900,
    'Votes': 450,
};

// Number of items that fit in a read capacity unit.
// 4KB consume 0.5 units.
const itemsPerUnit = table => (4 * 2 * 1000 / estimatedItemSize[table]);

// Numbers of items we can read each second.
const itemsPerScan = (table) => {
    const maxCapacityUnits = schemas[table].ProvisionedThroughput.ReadCapacityUnits;
    return (maxCapacityUnits / 2) * itemsPerUnit(table);
};


// Scan a table for X elements, with X being the number of items we can read
// each second.
// The returned promise resolves with an object containing a list of items from
// the table, and if not all items were retrieved, then the last key retrieved
// is also specified.
// TODO - maybe we want to limit the scan to items modified in the last day (
// for this to work properly we need to specify createdAt and modifiedAt on all
// items).
const scan = async (table, ExclusiveStartKey = undefined) => {
    const params = {
        ExclusiveStartKey,
        TableName: table,
        Limit: itemsPerScan(table),
        Select: 'ALL_ATTRIBUTES',
        ReturnConsumedCapacity: 'TOTAL',
    };

    const res = await dynamo('scan', params);
    const items = flattenItems(res.Items);

    delete res.Items;
    return { lastKey: res.LastEvaluatedKey, items };
};


// Get all items from a table. Can take quite a while depending on the size and
// max throughput of the table.
const getTable = async (table) => {
    // Used for controlling the frequency of requests we send to DynamoDB
    // (so we don't exceed the provisioned throughput).
    const limiter = new Bottleneck(1, 1000);

    const items = [];
    let res;

    while (!res || res.lastKey) {
        res = await limiter.schedule(scan, table, res && res.lastKey);
        items.push(...res.items);

        console.groupCollapsed('Total items fetched:', items.length);
        console.log('Last key:', res.lastKey);
        console.groupEnd();
    }

    return items;
};

const undefined_to_null = (key, value) => (
    value === undefined ? null : value
);


const writeItems = (items, table) => {
    console.log(`Writing ${items.length} items`);
    const filename = `${table.toLowerCase()}-bak.json`;
    const contents = items.map(item => JSON.stringify(item, undefined_to_null)).join('\n');
    fs.writeFileSync(resolve(__dirname, '..', '..', filename), contents);
};


let tables = Object.keys(schemas);

// If we specify a table as an argument when running this script, only that
// table will be backed up, otherwise all tables are backed up.
const table = process.argv[2];
if (table) {
    tables = [table];
}

tables.forEach((tableName) => {
    console.log(`Reading ${Math.floor(itemsPerScan(tableName))} items per second.`);
    timeit(getTable(tableName))
        .then(items => timeit(writeItems, items, tableName))
        .catch(err => console.error(err));
});
