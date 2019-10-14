const express = require('express');
const { jwtCheck, getUserID } = require('../utils/auth');
const dynamo = require('../utils/dynamoClient');
const votes = require('../helpers/votes');
const { cache } = require('../utils/cache');
const { cacheKeys } = require('../constants.json');
const { APIError, logger } = require('../utils/errors');


const router = express.Router();
// This endpoint requires authentication
router.use(jwtCheck('vote:maps'));

// Error message for unauthorized clients
router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    throw new APIError(401, 'unauthorized');
  }
});


// Get user votes by map, or all user votes (if mapID is not specified).
router.get('/', (req, res) => {
  const auth = req.get('Authorization');

  // Either get the userID from cache, or get it grom Auth0. Then if there's a
  // mapID specified return all voted of that user for that map, otherwise
  // return all their votes.
  cache(auth, getUserID(auth), 300, true)
    .then((userID) => {
      if (req.query.mapID) {
        // We might want to remove the expiration time and update this list when
        // the user votes on something.
        return cache(
          `${cacheKeys.votes.byUserMap}${userID},${req.query.mapID}`,
          votes.byUserMap(userID, req.query.mapID),
          300
        );
      }

      return votes.byUser(userID);
    })
    .then(data => res.send(data.Items))
    .catch(err => logger(err, res));
});

/*
  header:
    Authorization - Bearer <authentication_token>

  params:
    resourceID - parentID|URL
    direction - [1, 0, -1]
*/
router.post('/', (req, res) => {
  const auth = req.get('Authorization');
  const resourceID = req.body.resourceID;
  const direction = Number(req.body.direction);

  if (isNaN(direction)) {
    throw new APIError(400, 'invalid vote direction');
  }

  // Either get the userID from cache, or get it from Auth0. Then vote on the
  // resource, and send back the resource with the updated score.
  cache(auth, getUserID(auth), 5, true)
    .then(userID => votes.vote(userID, resourceID, direction))
    .then(data => res.send(data))
    .catch(err => logger(err, res));
});


module.exports = router;
