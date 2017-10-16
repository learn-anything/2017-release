const express = require('express');
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


const findNode = (nodes, test) => {
  if (!nodes) {
    return undefined;
  }

  let res = nodes.find(test);

  if (res) {
    return res;
  }

  nodes.forEach((node) => {
    const subRes = findNode(node.nodes, test);

    if (subRes) {
      res = subRes;
    }
  });

  return res;
};

/*
  params:
    mapID - map.id
    nodeText - node.text
    resText - resource.text
    dir - [1, 0, -1]
*/
router.post('/', (req, res) => {
  const { mapID, nodeText, resText, dir } = req.body;

  if (mapID && nodeText && resText && (dir || dir === 0)) {
    updateMap(mapID, (map) => {
      // Find the node containing the resource to vote on.
      // If it doesn't exist, throw an error.
      const node = findNode([map.map], node => node.text === nodeText)
      if (!node) {
        res.status(404).send({ msg: 'node not found' });
        return null;
      }

      const resource = node.resources && node.resources.find(res => res.text === resText);
      if (!resource) {
        res.status(404).send({ msg: 'resource not found' });
        return null;
      }

      // TODO - check if user already voted

      switch (dir) {
        case 1:
          resource.score.up += 1;
          break;

        case -1:
          resource.score.down += 1;
          break;

        // Only for testing
        case 0:
          resource.score.up = 0;
          resource.score.down = 0;
          break;
      }

      return map;
    })
      .then(data => res.send(data))
      .catch(err => res.status(500).send(err));
  } else {
    res.status(400).send({ msg: 'malformed request' });
  }
  /*dynamo('getItem', {
    Key: { id: { N: req.params.id } },
    TableName: 'maps',
  })
    .then(data => res.send({
      title: data.Item.title.S,
      tag: data.Item.tag && data.Item.tag.S,
      map: JSON.parse(data.Item.map.S),
      id: data.Item.id.N,
    }))
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });*/
});


module.exports = router;
