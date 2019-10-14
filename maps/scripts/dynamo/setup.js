#!/bin/env node
const AWS = require('aws-sdk');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const Bottleneck = require('bottleneck');
const schemas = require(`${__dirname}/schemas`);
const timeit = require(`${__dirname}/../utils/timeit`);

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

const dynamo = new AWS.DynamoDB();
const doc = new AWS.DynamoDB.DocumentClient();

// Convert dynamo calls to Promises
const dynamodb = (method, params = {}) => new Promise((resolve, reject) => {
  dynamo[method](params, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

// Convert doc calls to Promises
const docClient = (method, params = {}) => new Promise((resolve, reject) => {
  doc[method](params, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});


// http://bytesizematters.com/
// Average size in bytes of an Item of a given table.
const estimatedItemSize = {
    'Maps': 300,
    'Nodes': 150,
    'Resources': 900,
    'Votes': 450,
};

// Number of items that fit in a write capacity unit.
// 4KB consume 0.5 units.
const itemsPerUnit = table => (4 * 2 * 1000 / estimatedItemSize[table]);

// Numbers of items we can write each second.
const itemsPerBatch = (table) => {
    const maxCapacityUnits = schemas[table].ProvisionedThroughput.WriteCapacityUnits;
    return Math.min((maxCapacityUnits / 2) * itemsPerUnit(table), 25);
};

// Callback for writeBatch, checks if there's any unwritten items,
// and if there are it sends another request for them.
const writeCallback = async(tableName, data) => {
  if (data.UnprocessedItems && data.UnprocessedItems[tableName] &&
    data.UnprocessedItems[tableName].length > 0) {
    const params = { RequestItems: data.UnprocessedItems };

    const newData = await docClient('batchWrite', params);
    await writeCallback(tableName, newData);
  } else {
    console.log('[DS] BatchWriteItem processed all items');
  }
};

const writeBatch = async (tableName, items) => {
  const params = {
    RequestItems: {
      [tableName]: items,
    },
  };

  if (params.RequestItems[tableName].length > 0) {
    console.log(`[DS] Writing ${items.length} elements on ${tableName}`);
    const data = await docClient('batchWrite', params);
    await writeCallback(tableName, data);
  }
};

// Get all items from a table backup, and write them on the table.
const writeTable = async (tableName) => {
  // Convert table name to filename (eg. Maps => 'maps-bak.json').
  const filename = `${tableName.toLowerCase()}-bak.json`;
  const limiter = new Bottleneck(1, 1000);

  if (tableName === 'Votes') {
    return;
  }

  // Read lines from backup file, split them and parse them.
  const contents = readFileSync(resolve(__dirname, '..', '..', filename), 'utf-8')
    .split('\n')
    .map(item => ({ PutRequest : { Item: JSON.parse(item) } }));
  while (contents.length) {
    const items = [];
    for (let i = 0; i < itemsPerBatch(tableName); i += 1) {
      if (contents.length) {
        items.push(contents.pop());
      }
    }

    res = await limiter.schedule(writeBatch, tableName, items);
  }
}

const setup = async () => {
  // Get existing tables.
  const tables = (await dynamodb('listTables')).TableNames;

  // If there's any tables, delete the ones that we are going to create.
  if (tables.length) {
    for (let tableName of Object.keys(schemas)) {
      if (tables.includes(tableName)) {
        await dynamodb('deleteTable', { TableName: tableName });
      }
    }
    console.log('Deleted all tables.');
  }

  // Create the tables needed.
  for (let tableSchema of Object.values(schemas)) {
    await dynamodb('createTable', tableSchema);
  }
  console.log('Created all tables.');

  // Load data into tables.
  Object.keys(schemas).forEach(tableName => timeit(writeTable(tableName)));
};

timeit(setup())
  .catch(err => console.error(err));
