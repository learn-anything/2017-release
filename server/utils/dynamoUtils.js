const dynamo = require('./dynamoClient');

function mapToItem(map) {
  const item = {
    title: { S: map.title },
    tag: { S: map.tag },
    id: { N: `${map.id}` },
    map: { S: JSON.stringify(map.map) },
  };

  if (!map.tag) {
    delete item.tag;
  }

  return item;
}

async function updateMap(id, update) {
  let map = await dynamo('getItem', {
    Key: { id: { N: `${id}` } },
    TableName: 'maps',
  });

  map = {
    title: map.Item.title.S,
    tag: map.Item.tag && map.Item.tag.S,
    map: JSON.parse(map.Item.map.S),
    id: map.Item.id.N,
  };

  // If the update function returns null it means that the map shouldn't be
  // updated.
  const newMap = update(map);
  if (newMap === null) {
    return;
  }

  return await dynamo('putItem', {
    Item: mapToItem(newMap),
    TableName: 'maps',
    ReturnConsumedCapacity: 'TOTAL',
  });
}


module.exports = {
  updateMap,
}
