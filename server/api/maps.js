const express = require('express');
const elastic = require('../utils/elasticClient');
const dynamo = require('../utils/dynamoClient');


const router = express.Router();


// Search map by key (name of map) or get random map (if no query is specified).
router.get('/', (req, res) => {
  const q = req.query.q;

  let body = {
    query: {
      match: {
        key: {
          query: q,
          analyzer: 'standard',
          fuzziness: 'AUTO',
        },
      },
    },
  };

  // If no query is specified return a random map.
  if (!q) {
    body = {
      size: 1,
      query: {
        function_score: {
          functions: [{ random_score: { seed: (new Date()).getMilliseconds() } }],
        },
      },
    };
  }

  elastic
    .search({ body, index: 'maps' })
    .then((result) => {
      // Format results and send them back to the client.
      const hits = result.hits.hits.map(hit => ({
        key: hit._source.key,
        id: hit._id,
        nodesCount: hit._source.nodesCount,
      }));

      res.send(hits);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

// Get map by ID.
router.get('/:id(\\d+)', (req, res) => {
  dynamo('getItem', {
    Key: { id: { N: req.params.id } },
    TableName: 'maps',
  })
    .then(data => res.send({
      title: data.Item.title.S,
      tag: data.Item.tag && data.Item.tag.S,
      map: JSON.parse(data.Item.map.S),
      id: data.Item.id.N,
    }))
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});


// Get map by title.
router.get(/\/(.*)/, (req, res) => {
  // Convert from "/path/to/map/" to "learn anything - path - to - map" format.
  let title = req.params[0]
    .replace(/\/$/, '')
    .replace(/-/g, ' ')
    .replace(/\//g, ' - ');

  if (!title.startsWith('learn anything')) {
    title = `learn anything - ${title}`;
  }

  const body = {
    size: 1,

    query: {
      constant_score: {
        filter: { term: { title } },
      },
    }
  };

  elastic
    .search({ body, index: 'maps' })
    // Search by title on ES the map ID
    .then((result) => {
      const hits = result.hits.hits;
      if (hits.length === 1) {
        return dynamo('getItem', {
          Key: { id: { N: `${hits[0]._source.id}` } },
          TableName: 'maps',
        });
      } else {
        res.status(404).send('Map not found');
      }
    })
    // Get map by ID on DynamoDB
    .then(data => res.send({
      title: data.Item.title.S,
      tag: data.Item.tag && data.Item.tag.S,
      map: JSON.parse(data.Item.map.S),
      id: data.Item.id.N,
    }))
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});


module.exports = router;
