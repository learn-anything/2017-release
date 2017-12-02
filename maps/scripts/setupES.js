/*
 * This script creates an elasticsearch index called "maps",
 * and uploads all maps to it. If the index is already present,
 * it will be deleted along with its content first.
 */
const AWS = require('aws-sdk');
const AWS_ES = require('http-aws-es');
const elasticsearch = require('elasticsearch');
const { walkDir } = require(`${__dirname}/utils/dir`);
const fs = require('fs-extra');

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


function countNodes(nodes) {
  const count = nodes
    .map(node => countNodes(node.nodes))
    .reduce((sum, val) => (sum + val), 0);

  return nodes.length + count;
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
async function createMap(map, i) {
  const parsedMap = {
    title: map.title,
    id: map.id,
  };

  //const parsedMap = Object.assign({}, map);
  //delete parsedMap.id;

  // Set the map key for each search. If there's a tag use that,
  // otherwise use the leftmost topic on the title.
  if (map.tag) {
    parsedMap.key = map.tag;
  } else {
    const splitTitle = map.title.split(' - ');
    parsedMap.key = splitTitle[splitTitle.length - 1];
  }

  parsedMap.nodesCount = countNodes([map.map]);

  const options = {
    id: i,
    index: 'maps',
    type: 'map',
    body: parsedMap,
  };

  console.log(await client.create(options));
  console.log(parsedMap.title, 'added');
}

// Add all maps to index
async function createMaps() {
  const visited = [];
  let id = 0;

  for (let map of walkDir('.')) {
    if (!visited.includes(map.data.title)) {
      visited.push(map.data.title);
      map.data.id = id;
      id += 1;

      if (process.env.NODE_ENV === 'production') {
        await sleep(200);
        await fs.writeFile(map.path, JSON.stringify(map.data, null, 2));
      }

      await createMap(map.data, map.data.id);
    }
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

setup()
  .then(() => console.log('done'))
  .catch((err) => {
    console.error(err);
    process.exit();
  });
