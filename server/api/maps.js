const express = require('express');
const elastic = require('../utils/elasticClient');
const dynamo = require('../utils/dynamoClient');
const memcachedUtils = require('../utils/memcachedUtils');

// 2 hours cache lifetime for maps
const CACHE_LIFETIME = 2 * 60 * 60;


const router = express.Router();

if (process.env.MEMCACHED) {
  router.use(memcachedUtils.middleware);
}


const getMapByID = async (mapID) => {
  const { Item } = await dynamo('get', {
    TableName: 'Maps',
    Key: { mapID: Number(mapID) }
  });

  const map = {
    title: Item.title,
    mapID: Item.mapID,
    key: Item.key,
  };

  map.nodes = {};
  map.resources = {};

  const nodes = (await dynamo('query', {
    TableName: 'Nodes',
    IndexName: 'MapIndex',
    Select: 'ALL_ATTRIBUTES',
    KeyConditionExpression: 'mapID = :value',
    ExpressionAttributeValues: {
      ':value': Number(mapID),
    },
  })).Items;

  const resources = (await dynamo('query', {
    TableName: 'Resources',
    IndexName: 'MapIndex',
    Select: 'ALL_ATTRIBUTES',
    KeyConditionExpression: 'mapID = :value',
    ExpressionAttributeValues: {
      ':value': Number(mapID),
    },
  })).Items;

  nodes.forEach((node) => {
    if (map.nodes[node.parentID]) {
      map.nodes[node.parentID].push(node);
    } else {
      if (node.parentID === null) {
        map.nodes[node.parentID] = node;
      } else {
        map.nodes[node.parentID] = [node];
      }
    }
  });

  resources.forEach((resource) => {
    if (map.resources[resource.parentID]) {
      map.resources[resource.parentID].push(resource);
    } else {
      map.resources[resource.parentID] = [resource];
    }
  });

  return map;
};


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
      memcachedUtils.set(req, hits, CACHE_LIFETIME);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

// Get map by ID.
router.get('/:id(\\d+)', (req, res) => {
  getMapByID(req.params.id)
    .then((data) => {
      res.send(data);
      memcachedUtils.set(req, data, CACHE_LIFETIME);
    })
    .catch((err) => {
      console.log(err);
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
        return getMapByID(hits[0]._id);
      } else {
        res.status(404).send('Map not found');
      }
    })
    // Get map by ID on DynamoDB
    .then((data) => {
      res.send(data);
      memcachedUtils.set(req, data, CACHE_LIFETIME);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

module.exports = router;
