/*
 * This script creates an elasticsearch index called "maps",
 * and uploads all maps to it. If the index is already present,
 * it will be deleted along with its content first.
 */
const AWS = require('aws-sdk');
const { resolve } = require('path');
const AWS_ES = require('http-aws-es');
const { readFileSync } = require('fs');
const Bottleneck = require('bottleneck');
const elasticsearch = require('elasticsearch');
const timeit = require(`${__dirname}/../utils/timeit`);


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


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Create index to store all maps
async function createIndex() {
  const body = {
    settings: {
      analysis: {
        filter: {
          autocomplete_filter: {
            type: 'ngram',
            min_gram: 1,
            max_gram: 20,
          },
        },

        analyzer: {
          autocomplete: {
            type: 'custom',
            tokenizer: 'standard',
            filter: ['lowercase', 'autocomplete_filter'],
          },
        },
      },
    },

    mappings: {
      map: {
        properties: {
          title: { type: 'string', index: 'not_analyzed' },
          key: { type: 'string', analyzer: 'autocomplete' },
        },
      },
    },
  };

  console.log('creating new index');
  console.log(await client.indices.create({ index: 'maps', body }));
}

// Create map
async function createMap(map) {
  const parsedMap = { ...map, id: map.mapID };
  delete parsedMap.mapID;

  const options = {
    id: map.mapID,
    index: 'maps',
    type: 'map',
    body: parsedMap,
  };

  console.log(await client.create(options));
  console.log(parsedMap.title, 'added');
}

// Add all maps to index
async function createMaps() {
  const filename = `maps-bak.json`;
  const limiter = new Bottleneck(1, 1000);

  // Read lines from backup file, split them and parse them.
  const contents = readFileSync(resolve(__dirname, '..', '..', filename), 'utf-8')
    .split('\n')
    .map(item => JSON.parse(item));

  for (let map of contents) {
   if (process.env.NODE_ENV === 'production') {
      await sleep(200);
    }

    await createMap(map);
  }
}

// Check if the index already exists, if it does delete it; then
// create a new index and load all maps.
async function setup() {
  const indexExists = await client.indices.exists({ index: 'maps' });

  if (indexExists) {
    console.log('deleting old maps');
    console.log(await client.deleteByQuery({
      index: 'maps',
      body: {
        query: {
          match_all: {},
        },
      },
    }));

    console.log('deleting old index');
    console.log(await client.indices.delete({ index: 'maps' }));
  }

  await createIndex();
  await createMaps();
}

timeit(setup())
  .then(() => {})
  .catch(err => console.error(err));
