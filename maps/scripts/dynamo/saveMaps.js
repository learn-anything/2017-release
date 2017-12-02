const { walkDir } = require('../utils/dir');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


let nodeID = 0;
const addedResources = [];

const getNodesAndResources = (node, mapID, parentID=null) => {
  const nodes = [{
    mapID,
    nodeID,
    parentID,
    text: node.text,
  }];
  const resources = node.resources.map(({ text, url, category, score }) => {
    const resourceID = `${nodes[0].nodeID}|${url}`;

    if (!addedResources.includes(resourceID)) {
      const res = { mapID, url, score, resourceID, parentID: nodes[0].nodeID };

      if (category) { res.category = category; }
      if (text) { res.text = text; }
      if (!url) { return; }

      addedResources.push(resourceID);
      return res;
    }
  });

  nodeID += 1;

  node.nodes.forEach((n) => {
    const res = getNodesAndResources(n, mapID, nodes[0].nodeID);
    nodes.push(...res.nodes);
    resources.push(...res.resources);
  });

  return {
    nodes,
    resources,
  };
};

const batchWriteCallback = async (docClient, table, data) => {
  if (data.UnprocessedItems && data.UnprocessedItems[table] &&
    data.UnprocessedItems[table].length > 0) {
    const params = { RequestItems: data.UnprocessedItems };

    const newData = await docClient('batchWrite', params);
    await batchWriteCallback(docClient, table, newData);
  } else {
    console.log('BatchWriteItem processed all items.');
  }
};

const batchPut = async (docClient, items, table) => {
  while (items.length > 0) {
    const params = {
      RequestItems: { [table]: [] },
    };

    for (let i = 0; i < 25; i++) {
      const item = items.pop();

      if (item) {
        params.RequestItems[table].push({ PutRequest: { Item: item } });
      }
    }

    if (params.RequestItems[table].length > 0) {
      console.log(`Calling batchWrite with ${params.RequestItems[table].length} items`);
      const data = await docClient('batchWrite', params);
      await batchWriteCallback(docClient, 'Nodes', data);

      if (process.env.NODE_ENV === 'production') {
        await sleep(500);
      }
    }
  }
};

module.exports = async (docClient) => {
  for (let el of walkDir('.')) {
    const splitTitle = el.data.title.split(' - ');
    const map = {
      mapID: el.data.id,
      title: el.data.title,
      key: el.data.tag || splitTitle[splitTitle.length - 1],
    };

    const { nodes, resources } = getNodesAndResources(el.data.map, map.mapID);

    // Save stuff on dynamoDB
    await docClient('put', {
      TableName: 'Maps',
      Item: map,
      ReturnConsumedCapacity: 'TOTAL',
      ReturnItemCollectionMetrics: 'SIZE',
    });

    await batchPut(docClient, nodes, 'Nodes');
    await batchPut(docClient, resources, 'Resources');
    console.log(map.title, map.mapID);

    if (process.env.NODE_ENV === 'production') {
      await sleep(500);
    } else {
      await sleep(200);
    }
  }
}