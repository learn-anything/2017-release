const express = require('express');
const client = require('../elasticClient');


const router = express.Router();
const search = (body, res, send) => {
  client.search({ body, index: 'maps' })
    .then(send)
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
};


// Search for map or get random map (if no query is specified).
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

  search(body, res, (result) => {
    const hits = result.hits.hits.map(hit => ({
      key: hit._source.key,
      id: hit._id,
    }));

    res.send(hits);
  });
});

// Get specific map.
router.get('/:id(\\d+)', (req, res) => {
  client.get({
    index: 'maps',
    type: 'map',
    id: req.params.id,
  })
    .then((result) => {
      res.send(result._source);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

// Get specific map, by map title.
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

  search(body, res, (result) => {
    const hits = result.hits.hits;

    if (hits.length === 1) {
      res.send(hits[0]._source);
    } else {
      res.status(404).send('Map not found');
    }
  });
});


module.exports = router;
