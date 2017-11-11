const dynamo = require('../utils/dynamoClient');
const cache = require('../utils/cache');
const { cacheKeys } = require('../constants.json');
const { APIError } = require('../utils/errors');


async function create(text, url, category, parentID, userID) {
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

  const resource = (await cache.cache(
    cacheKeys.resources.byID + `${parentID}|${url}`,
    dynamo('get', {
      TableName: 'Resources',
      Key: { resourceID: `${parentID}|${url}` },
    })
  ));

  // Resource exists, and for now no one is allowed to edit resources.
  if (resource) {
    throw new APIError(403, 'resource already exists');
  }

  const response = await dynamo('put', {
    TableName: 'Resources',
    Item: {
      url,
      text,
      category,
      parentID,
      author: userID,
      mapID: node.mapID,
      resourceID: `${parentID}|${url}`,
      score: { up: 0, down: 0 },
    },
  });

  await cache.del(cacheKeys.maps.byID + node.mapID);

  return response;
}


module.exports = {
  create,
};
