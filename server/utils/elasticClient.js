const AWS = require('aws-sdk');
const AWS_ES = require('http-aws-es');
const elasticsearch = require('elasticsearch');


// Set default host to 'localhost'. If we're running on Docker environment use
// 'elastic'. If another IP is specified, use that one.
let host = 'localhost';
if (process.env.DOCKER) {
  host = 'es';
}
if (process.env.ELASTICSEARCH_HOST) {
  host = process.env.ELASTICSEARCH_HOST;
}

let client = elasticsearch.Client({
  host: `${host}:9200`,
  log: 'error',
});


// If on production get the credentials from the environment, and set the right
// endpoint.
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


// Returns the body required to get a random element form an index.
function random() {
  // Seed here could be used for consistently random scoring, for example if
  // the order of documents should be the same for the same user, while staying
  // random across different users.
  //
  // In our case it doesn't really matter though, cause we're using only the
  // first result and that should always be "truly" random.
  const random_score = { seed: (new Date()).getMilliseconds() };

  return {
    size: 1,

    query: {
      function_score: {
        functions: [{ random_score }],
      },
    },
  };
}

// Returns the body required to fuzzy search elements with an attribute matching
// the query.
function fuzzy(attribute, query) {
  // Here we specify which attribute we want to query, and the query that we
  // want that attribute to match. We could also set a specific fuzziness, so we
  // only return elements within a certain edit distance from the query, but
  // I found that AUTO works best.
  //
  // TODO - this needs to be updated, cause currently results are a bit shit.
  const match = {
    [attribute]: {
      query,
      analyzer: 'standard',
      fuzziness: 'AUTO',
    },
  };

  return { query: { match } };
}

// Returns the body to get the first item on an index with a specific attribute.
function get(term) {
  // This query is executed in filter context. This means that instead of
  // scoring documents based on how well they match the query, all documents
  // that simply match the query are returned (in this case only the first
  // document is returned).
  //
  // Example: To generate the body to return all documents that have a title
  // equal to 'elasticsearch', we would call this function as follows.
  //  get({ title: 'elasticsearch'});
  return {
    size: 1,

    query: {
      constant_score: {
        filter: { term },
      },
    },
  };
}


module.exports = {
  client,
  random,
  fuzzy,
  get,
};
