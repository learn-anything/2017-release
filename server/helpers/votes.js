const dynamo = require('../utils/dynamoClient');


const update = async (userID, resourceID, direction) => {
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

const get = user => ({
  TableName: 'Votes',
  Select: 'ALL_ATTRIBUTES',
  KeyConditionExpression: 'userID = :userID',
  ExpressionAttributeValues: { ':userID': user },
});

const getByMap = (userID, mapID) =>  ({
  TableName: 'Votes',
  Select: 'ALL_ATTRIBUTES',
  IndexName: 'MapIndex',
  KeyConditionExpression: 'userID = :user and mapID = :map',
  ExpressionAttributeValues: {
    ':user': userID,
    ':map': Number(mapID),
  },
});


module.exports = {
  get,
  getByMap,
  update,
};
