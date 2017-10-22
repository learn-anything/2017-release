const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-west-1',
  accessKeyId: process.env.DYNAMO_READ_KEY_ID,
  secretAccessKey: process.env.DYNAMO_READ_SECRET_ACCESS_KEY,
});

if (process.env.NODE_ENV !== 'production') {
  AWS.config.update({
    region: 'us-west-1',
    accessKeyId: 'fakeAccessKeyId',
    secretAccessKey: 'fakeSecretAccessKey',
    endpoint: new AWS.Endpoint('http://localhost:8000'),
  });
}

const docClient = new AWS.DynamoDB.DocumentClient();

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
