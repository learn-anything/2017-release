const express = require('express');
const axios = require('axios');
const jwtCheck = require('../utils/jwtCheck');
const dynamo = require('../utils/dynamoClient');
const { updateMap } = require('../utils/dynamoUtils');

const router = express.Router();
// This endpoint requires authentication
router.use(jwtCheck('vote:maps'));

// Error message for unauthorized clients
router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ msg: 'unauthorized' });
  }
});


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
    Item: { userID, resourceID, direction },
  });

  await dynamo('put', {
    TableName: 'Resources',
    Item: resource,
  });
};

/*
  get all votes of authenticated user
*/
router.get('/', (req, res) => {
  axios('https://learn-anything.auth0.com/userinfo', {
    headers: { Authorization: req.get('Authorization') }
  })
    .then(({ data }) => {
      const params = {
        TableName: 'Votes',
        Select: 'ALL_ATTRIBUTES',
        KeyConditionExpression: 'userID = :value',
        ExpressionAttributeValues: { ':value': data.sub },
      };

      return dynamo('query', params);
    })
    .then((data) => {
      res.send(data.Items);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

/*
  params:
    userID - String
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
    .then(() => {
      res.send({ msg: 'OK' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});


module.exports = router;
