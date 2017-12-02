const AWS = require('aws-sdk');
const schemas = require('./schemas');
const saveMaps = require('./saveMaps');

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

function print(obj, v=true) {
  if (!v) {
    return obj;
  }

  try {
    ppJson(obj);
  } catch(e) {
    console.log(JSON.stringify(obj, null, 2));
  }

  return obj;
}

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

// Convert docClient calls to Promises
const doc = (method, params) => new Promise((resolve, reject) => {
  docClient[method](params, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});


async function ls(table, v=true) {
  if (table) {
    const res = await doc('scan', { TableName: table });
    return print(res, v);
  }

  const res = await dynamo('listTables', {});
  return print(res, v).TableNames;
}

// Example: rm('Maps Nodes Resources Votes')
async function rm(tables) {
  for (let table of tables.split(' ')) {
    if ((await ls(null, false)).includes(table)) {
      await dynamo('deleteTable', { TableName: table });
      print({ removed: table });
    }
  }
}

// Example: get('Maps', { mapID: 42 })
async function get(table, key) {
  const res = await doc('get', { TableName: table,  Key: key });
  return print(res);
}

async function mktables(schemas) {
  for (let schema of schemas) {
    await dynamo('createTable', schema);
    print({ created: schema.TableName });
  }
}


async function setup() {
  const startTime = new Date();
  // const laTablews = schemas.map(schema => schema.TableName);
  // await rm(laTables.join(' '));

  // await mktables(schemas);
  await ls();
  await saveMaps(doc);

  const duration = (new Date() - startTime) / 1000;
  return duration;
}

setup()
  .then((duration) => {
    console.log(`Done in ${duration}s`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
