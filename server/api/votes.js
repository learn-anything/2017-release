const express = require('express');
const axios = require('axios');
const jwtCheck = require('../utils/jwtCheck');
const dynamo = require('../utils/dynamoClient');
const votes = require('../helpers/votes');
const cache = require('../utils/cache');


const router = express.Router();
// This endpoint requires authentication
router.use(jwtCheck('vote:maps'));

// Error message for unauthorized clients
router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ msg: 'unauthorized' });
  }
});


const getUserID = auth =>
  axios('https://learn-anything.auth0.com/userinfo', {
    headers: { Authorization: auth }
  }).then(({ data }) => data.sub);


/*
  get all votes of authenticated user
*/
router.get('/', (req, res) => {
  const auth = req.get('Authorization');

  cache(auth, getUserID(auth), 300, true)
    .then((userID) => {
      let params = votes.get(userID);

      if (req.query.mapID) {
        params = votes.getByMap(userID, req.query.mapID);
      }

      return dynamo('query', params);
    })
    .then((data) => {
      res.send(data.Items);
      // memcachedUtils.set(req, data.Items, CACHE_LIFETIME);
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

  const auth = req.get('Authorization');

  cache(auth, getUserID(auth), 300, true)
    .then((userID) => (
      votes.update(userID, resourceID, direction)
    ))
    .then((resource) => {
      res.send(resource);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.data);
    });
});


module.exports = router;
