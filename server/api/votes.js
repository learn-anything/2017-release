const express = require('express');
const axios = require('axios');
const jwtCheck = require('../utils/jwtCheck');
const dynamo = require('../utils/dynamoClient');
const { updateMap } = require('../utils/dynamoUtils');
const memcachedUtils = require('../utils/memcachedUtils');

const CACHE_LIFETIME = 60;

const router = express.Router();
// This endpoint requires authentication
router.use(jwtCheck('vote:maps'));

// Error message for unauthorized clients
router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ msg: 'unauthorized' });
  }
});

if (process.env.MEMCACHED) {
  router.use(memcachedUtils.middleware);
}

const updateVote = async (userID, resourceID, direction) => {
  const vote = (await dynamo('get', {
      TableName: 'Votes',
      Key: { userID, resourceID },
    })
  ).Item;

  const resource = (await dynamo('get', {
      TableName: 'Resources',
      Key: { resourceID },
    })
  ).Item;

  if (!resource) {
    throw Error({ msg: 'resource does not exist' });
  }

  // Remove the previous vote if present
  if (vote) {
    if (vote.direction === 1) {
      resource.score.up -= 1;
    }

    if (vote.direction === -1) {
      resource.score.down -= 1;
    }
  }

  // Add the new vote
  if (direction === 1) {
    resource.score.up += 1;
  }

  if (direction === -1) {
    resource.score.down += 1;
  }

  await dynamo('put', {
    TableName: 'Votes',
    Item: { userID, resourceID, direction, mapID: resource.mapID },
  });

  await dynamo('put', {
    TableName: 'Resources',
    Item: resource,
  });

  return resource;
};

/*
  get all votes of authenticated user
*/
router.get('/', (req, res) => {
  axios('https://learn-anything.auth0.com/userinfo', {
    headers: { Authorization: req.get('Authorization') }
  })
    .then(({ data }) => {
      let params = {
        TableName: 'Votes',
        Select: 'ALL_ATTRIBUTES',
        KeyConditionExpression: 'userID = :userID',
        ExpressionAttributeValues: { ':userID': data.sub },
      };

      if (req.query.mapID) {
        params = {
          ...params,
          IndexName: 'MapIndex',
          KeyConditionExpression: 'userID = :user and mapID = :map',
          ExpressionAttributeValues: {
            ':user': data.sub,
            ':map': Number(req.query.mapID),
          },
        };
      }

      return dynamo('query', params);
    })
    .then((data) => {
      res.send(data.Items);
      memcachedUtils.set(req, data.Items, CACHE_LIFETIME);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

/*
  header:
    Authorization - Bearer <authentication_token>

  params:
    resourceID - Number
    direction - [1, 0, -1]
*/
router.post('/', (req, res) => {
  const resourceID = Number(req.body.resourceID);
  const direction = Number(req.body.direction);

  if (typeof resourceID !== 'number' || typeof direction !== 'number') {
    res.status(400).send({ msg: 'malformed request' });
    return;
  }

  axios('https://learn-anything.auth0.com/userinfo', {
    headers: { Authorization: req.get('Authorization') }
  })
    .then(({ data }) => {
      const userID = data.sub;
      return updateVote(userID, resourceID, direction);
    })
    .then((resource) => {
      res.send(resource);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.data);
    });
});


module.exports = router;
