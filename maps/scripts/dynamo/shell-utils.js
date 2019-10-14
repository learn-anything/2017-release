// This file is a collection of functions that can be useful on the
// DynamoDB shell.


// Converts dynamodb calls to Promises
const dynamo = (method, params) => new Promise((resolve, reject) => {
  dynamodb[method](params, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

// Converts docClient calls to Promises
const doc = (method, params) => new Promise((resolve, reject) => {
  docClient[method](params, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});


// Lists all tables if no table is specified, otherwise it gets the first 10
// items from the specified table.
async function ls(table, n) {
  if (table) {
    const res = await doc('scan', {
      TableName: table,
      Limit: n || 10,
    });

    ppJson(res);
    return res;
  }

  const res = await dynamo('listTables', {});
  ppJson(res.TableNames);
  return res.TableNames;
}

// Example: rm('Maps Nodes Resources Votes')
async function rm(tables) {
  for (let table of tables.split(' ')) {
    if ((await ls(null, false)).includes(table)) {
      const response = await dynamo('deleteTable', { TableName: table });
      ppJson({ response, removed: table });
    }
  }
}

// Example: get('Maps', { mapID: 42 })
async function get(table, key) {
  const res = await doc('get', {
    TableName: table,
    Key: key,
  });

  ppJson(res);
  return res;
}

async function mktables(schemas) {
  for (let schema of schemas) {
    const response = await dynamo('createTable', schema);
    ppJson({ response, created: schema.TableName });
  }
}

