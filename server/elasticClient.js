const AWS = require('aws-sdk');
const AWS_ES = require('http-aws-es');
const elasticsearch = require('elasticsearch');

AWS.config.update({
  region: 'us-west-1',
  accessKeyId: process.env.ELASTIC_NODE_KEY_ID,
  secretAccessKey: process.env.ELASTIC_NODE_ACCESS_KEY,
});

module.exports = elasticsearch.Client({
  host: ['https://search-learn-anything-dom7q2utc7a2kmjkugwhjxceru.us-west-1.es.amazonaws.com'],
  connectionClass: AWS_ES,
});
