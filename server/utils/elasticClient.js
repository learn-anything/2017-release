const AWS = require('aws-sdk');
const AWS_ES = require('http-aws-es');
const elasticsearch = require('elasticsearch');

let client = elasticsearch.Client({
  host: 'localhost:9200',
  log: 'error',
});

AWS.config.update({
  region: 'us-west-1',
  accessKeyId: 'fakeAccessKeyId',
  secretAccessKey: 'fakeSecretAccessKey',
});


// If in production set up the access keys and change endpoint.
if (process.env.NODE_ENV === 'production') {
  AWS.config.update({
    region: 'us-west-1',
    accessKeyId: process.env.ELASTIC_DYNAMO_KEY_ID,
    secretAccessKey: process.env.ELASTIC_DYNAMO_SECRET_ACCESS_KEY,
  });

  client = elasticsearch.Client({
    host: 'https://search-learn-anything-dom7q2utc7a2kmjkugwhjxceru.us-west-1.es.amazonaws.com',
    connectionClass: AWS_ES,
  });
}


// Returns the body required to get a random element from an index.
const random = () => ({
  size: 1,
  query: {
    function_score: {
      functions: [{ random_score: { seed: (new Date()).getMilliseconds() } }],
    },
  },
});

const get = term => ({
  size: 1,

  query: {
    constant_score: {
      filter: { term },
    },
  }
});

// Returns the body required to fuzzy search on an index, with a given query.
const fuzzy = query => ({
  query: {
    match: {
      key: {
        query,
        analyzer: 'standard',
        fuzziness: 'AUTO',
      },
    },
  },
});


module.exports = {
  random,
  fuzzy,
  get,
  client,
};
