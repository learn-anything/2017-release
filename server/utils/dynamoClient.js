const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-west-1',
  accessKeyId: 'fakeAccessKeyId',
  secretAccessKey: 'fakeSecretAccessKey',
});

if (process.env.NODE_ENV === 'production') {
  AWS.config.update({
    region: 'us-west-1',
    accessKeyId: process.env.ELASTIC_DYNAMO_KEY_ID,
    secretAccessKey: process.env.ELASTIC_DYNAMO_SECRET_ACCESS_KEY,
  });
}

let dynamodb = new AWS.DynamoDB();

if (process.env.NODE_ENV !== 'production') {
  dynamodb = new AWS.DynamoDB({
    endpoint: new AWS.Endpoint('http://localhost:8000'),
  });
}

const docClient = new AWS.DynamoDB.DocumentClient({ service: dynamodb });

module.exports = (method, params) =>
  new Promise((resolve, reject) => {
    docClient[method](params, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
