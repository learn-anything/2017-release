const elastic = require('../utils/elasticClient');
const dynamo = require('../utils/dynamoClient');


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

const getMapByTitle = title =>
  elastic.client
    .search({
      index: 'maps',
      body: elastic.get({ title }),
    })
    // Search by title on ES the map ID
    .then((result) => {
      const hits = result.hits.hits;

      if (hits.length === 1) {
        return getMapByID(hits[0]._id);
      } else {
        throw Error('map not found');
      }
    });

const searchMapByKey = query =>
  elastic.client
    .search({
      index: 'maps',
      body: query ? elastic.fuzzy(query) : elastic.random(),
    })
    .then((result) => {
      // Format results and send them back to the client.
      const hits = result.hits.hits.map(hit => ({
        key: hit._source.key,
        id: hit._id,
        nodesCount: hit._source.nodesCount,
      }));

      return hits;
    });


module.exports = {
  getMapByID,
  getMapByTitle,
  searchMapByKey,
};
