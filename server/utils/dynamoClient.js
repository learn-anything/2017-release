const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-west-1',
  accessKeyId: 'fakeAccessKeyId',
  secretAccessKey: 'fakeSecretAccessKey',
});

if (process.env.NODE_ENV !== 'production') {
  AWS.config.update({
    region: 'us-west-1',
    accessKeyId: process.env.DYNAMO_READ_KEY_ID,
    secretAccessKey: process.env.DYNAMO_READ_SECRET_ACCESS_KEY,
    endpoint: new AWS.Endpoint('http://localhost:8000'),
  });
}

const dynamodb = new AWS.DynamoDB();

module.exports = (method, params) =>
  new Promise((resolve, reject) => {
    dynamodb[method](params, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
