const dynamo = require('../utils/dynamoClient');
const cache = require('../utils/cache');
const { cacheKeys } = require('../constants.json');
const { APIError } = require('../utils/errors');


// Possible directions for a vote.
const directions = {
  '-1': 'down',
  0: 'reset',
  1: 'up',
};

// Create or modify a vote, update the score of the voted resource, and update
// the cached map.
async function vote(userID, resourceID, direction) {
  const modifiedAt = (new Date()).toString();
  let createdAt = (new Date()).toString();

  let [vote, resource] = await Promise.all([
    dynamo('get', { TableName: 'Votes', Key: { userID, resourceID } }),
    dynamo('get', { TableName: 'Resources', Key: { resourceID } }),
  ]);

  vote = vote.Item;
  resource = resource.Item;

  // Resource doesn't exist, or it was deleted.
  if (!resource) {
    throw new APIError(404, 'resource not found');
  }

  // Remove the previous vote if present.
  if (vote) {
    resource.score[directions[vote.direction]] -= 1;
    createdAt = vote.createdAt;
  }

  // Add the new vote.
  resource.score[directions[direction]] += 1;
  delete resource.score.reset;

  const newVote = {
    userID,
    resourceID,
    direction,
    createdAt,
    modifiedAt,
    mapID: resource.mapID,
  };

  // Update vote and resource on DynamoDB.
  await Promise.all([
    dynamo('put', { TableName: 'Votes', Item: newVote }),
    dynamo('put', { TableName: 'Resources', Item: resource }),
  ]);

  // Get the cached map, so we can update it and we don't need to make
  // additional requests to the DB.
  const map = await cache.get(cacheKeys.maps.byID + resource.mapID);

  // Map is not cached. Highly improbable as the user that is voting needs to
  // have got the map in some way, but not impossible, as we could have finished
  // the memory available for memcached and this map could have been deleted
  // from the cache.
  if (!map) {
    return { resource, vote: newVote };
  }

  console.log(`[MC] Replacing: ${cacheKeys.maps.byID + resource.mapID}`);

  const nodeResources = map.resources[resource.parentID];
  const oldResource = nodeResources.find(res => (
    res.resourceID === resource.resourceID
  ));
  const resourceIndex = nodeResources.indexOf(oldResource);

  // Set the new map value on cache.
  map.resources[resource.parentID][resourceIndex] = resource;
  const cached = await cache.set(cacheKeys.maps.byID + resource.mapID, map);
  console.log(`[MC] Cached: ${cached}`);

  // Return the updated resource and vote, so the client doesn't need to reload the map.
  return { resource, vote: newVote };
}

// Get votes by userID. Returns a promise.
function byUser(userID) {
  return dynamo('query', {
    TableName: 'Votes',
    Select: 'ALL_ATTRIBUTES',
    KeyConditionExpression: 'userID = :userID',
    ExpressionAttributeValues: { ':userID': userID },
  });
}

// Get user votes by mapID. Returns a promise.
function byUserMap(userID, mapID) {
  return dynamo('query', {
    TableName: 'Votes',
    Select: 'ALL_ATTRIBUTES',
    IndexName: 'MapIndex',
    KeyConditionExpression: 'userID = :user and mapID = :map',
    ExpressionAttributeValues: {
      ':user': userID,
      ':map': Number(mapID),
    },
  });
}


module.exports = {
  byUser,
  byUserMap,
  vote,
};
