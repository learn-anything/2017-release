const dynamo = require('../utils/dynamoClient');
const cache = require('../utils/cache');
const { cacheKeys } = require('../constants.json');
const { APIError } = require('../utils/errors');


async function create(text, url, category, parentID, userID) {
  const modifiedAt = (new Date()).toString();
  let createdAt = (new Date()).toString();

  const node = (await cache.cache(
    cacheKeys.nodes.byID + parentID,
    dynamo('get', {
      TableName: 'Nodes',
      Key: { nodeID: parentID },
    })
  )).Item;

  if (!node) {
    throw new APIError(404, 'the specified parent node does not exist');
  }

  const oldResource = (await dynamo('get', {
    TableName: 'Resources',
    Key: { resourceID: `${parentID}|${url}` },
  })).Item;

  // Resource exists, and for now no one is allowed to edit resources.
  if (oldResource) {
    createdAt = oldResource.modifiedAt;
    throw new APIError(403, 'resource already exists');
  }

  const newResource = {
    url,
    text,
    category,
    parentID,
    createdAt,
    modifiedAt,
    author: userID,
    mapID: node.mapID,
    resourceID: `${parentID}|${url}`,
    score: { up: 0, down: 0 },
  };

  const response = await dynamo('put', {
    TableName: 'Resources',
    Item: newResource,
  });

  // Get the cached map, so we can update it and we don't need to make
  // additional requests to the DB.
  const map = await cache.get(cacheKeys.maps.byID + node.mapID);

  // Map is not cached. Highly improbable as the user that is creating the resource
  // needs to have got the map in some way, but not impossible, as we could have
  // finished the memory available for memcached and this map could have been deleted
  // from the cache.
  if (!map) {
    console.log('[MC] map not found in cache');
    return newResource;
  }

  console.log(`[MC] Replacing: ${cacheKeys.maps.byID + node.mapID}`);

  // Set the new map value on cache.
  map.resources[parentID].push(newResource);
  const cached = await cache.set(cacheKeys.maps.byID + node.mapID, map);
  console.log(`[MC] Cached: ${cached}`);


  return newResource;
}


module.exports = {
  create,
};
