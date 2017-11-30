const AWS = require('aws-sdk');
const AWS_ES = require('http-aws-es');
const elasticsearch = require('elasticsearch');

// File containing map to update
const input = process.argv[2];

if (input === undefined) {
  console.log('No maps were updated due to insufficient arguments.\nRun this script with the following command: node updateSingle.js "path/to/map.json"');
  process.exit();
}

const map = require(`${__dirname}/../${input}`);

let client = elasticsearch.Client({
  host: 'localhost:9200',
  log: 'error',
});

if (process.env.NODE_ENV === 'production') {
  // Configure the region and credentials for aws-sdk
  AWS.config.update({
    region: 'us-west-1',
    accessKeyId: process.env.ELASTIC_NODE_KEY_ID,
    secretAccessKey: process.env.ELASTIC_NODE_ACCESS_KEY,
  });

  client = elasticsearch.Client({
    host: 'https://search-learn-anything-dom7q2utc7a2kmjkugwhjxceru.us-west-1.es.amazonaws.com',
    connectionClass: AWS_ES,
  });
}

client.update({ index: 'maps', type: 'map', id: map.id, body: { doc: map } })
  .then(() => {
    const splitTitle = map.title.split(' - ');
    const key = map.tag || splitTitle[splitTitle.length - 1];

    console.log('updated', key);
  })
  .catch((err) => {
    console.error(err.message);
    console.error(err);
    process.exit();
  });
