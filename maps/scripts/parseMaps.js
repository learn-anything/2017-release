#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const { emojiToCategory, matchEmojis } = require(`${__dirname}/utils/emojis`);
const { getText, getURL } = require(`${__dirname}/utils/regex`);
const { walkDir, mkdirs } = require(`${__dirname}/utils/dir`);

const input = path.resolve(__dirname, '../maps');
const output = path.resolve(__dirname, '..');


// Used for converting URLs with IDs to full URLs.
const mapsLookup = {};

// Used for getting the last ID that was added to elasticsearch.
let lastID = 0;
let lastMap;

/*
 * Take a node from MindNode format and return it in the following format:
 *
 *  {
 *    text: string,
 *    url: string,
 *    note: string || undefined,
 *    fx: number,
 *    fy: number,
 *    category: string,
 *    nodes: array[node],
 *  }
 */
const parseNode = (node) => {
  const parsedNode = {
    text: getText(node.title.text),
    note: node.note ? getText(node.note.text) : undefined,
    url: getURL(node.title.text),
    fx: node.location.x,
    fy: node.location.y,
    nodes: parseSubnodes(node.nodes),
  };

  // If the URL is an internal URL that uses the map ID,
  // convert it to the full URL that contains the path to the map.
  const matchInternalURL = parsedNode.url.match(/\/id\/(\S{40})/);

  if (matchInternalURL) {
    parsedNode.url = mapsLookup[matchInternalURL[1]];
  }

  if (parsedNode.note) {
    parsedNode.note = parsedNode.note.replace('if you think this can be improved in any way  please say', '');
  }

  const match = parsedNode.text.match(matchEmojis);

  if (match) {
    parsedNode.category = emojiToCategory(match[0]);
    parsedNode.text = parsedNode.text.replace(matchEmojis, '').trim();
  }

  return parsedNode;
};

/*
 * Parse an array of subnodes recursively. Uses parseNode, so the structure of
 * subnodes will be the same. The only difference is a color attribute on
 * subnodes, which has a string with a valid CSS color format.
 */
const parseSubnodes = subnodes => (
  subnodes.map((subnode) => {
    const parsedSub = parseNode(subnode);

    if (subnode.shapeStyle && subnode.shapeStyle.borderStrokeStyle) {
      parsedSub.color = subnode.shapeStyle.borderStrokeStyle.color;
    }

    parsedSub.nodes = parseSubnodes(subnode.nodes);
    return parsedSub;
  })
);

/*
 * Take a connection from MindNode format and return it in the following format:
 *
 *  {
 *    text: string,
 *    source: string,
 *    target: string,
 *    curve: {
 *      x: number,
 *      y: number,
 *    },
 *  }
 *
 * source and target are the text attributes of the nodes the connection links.
 * curve is the location of the focal point for a bezier curve.
 */
const parseConn = (conn, lookup) => {
  const parsedConn = {
    source: lookup[conn.startNodeID],
    target: lookup[conn.endNodeID],
    curve: {
      x: conn.wayPointOffset.x,
      y: conn.wayPointOffset.y,
    },
  };

  if (conn.title && conn.title.text) {
    parsedConn.text = getText(conn.title.text);
  }

  return parsedConn;
};


for (let map of walkDir(output)) {
  if (map.data.id > lastID) {
    lastID = map.data.id;
    lastMap = map.data.title;
  }
}

console.log(`last inserted map: ${lastMap} [${lastID}]`);

for (let map of walkDir(input)) {
  let relativeFilePath = map.path.replace(input, '').replace('.json', '');

  if (relativeFilePath !== '/learn-anything') {
    relativeFilePath = relativeFilePath.replace('/learn-anything', '');
  }

  mapsLookup[map.data.token] = relativeFilePath;
}

for (let map of walkDir(input)) {
  const nodesLookup = {};
  const splitTitle = map.data.title.split('-');
  let trigger = map.data.trigger;

  if (splitTitle[splitTitle.length - 1].trim(' ') === trigger) {
    trigger = '';
  }

  const parsedMap = {
    title: map.data.title,
    tag: trigger,
    description: map.data.description,
  };

  // Parse all nodes and populate the lookup table, which will be used for
  // converting IDs to node title on connections.
  parsedMap.nodes = map.data.nodes.map((node) => {
    const parsedNode = parseNode(node);
    nodesLookup[node.id] = parsedNode.text;
    return parsedNode;
  });

  parsedMap.connections = map.data.connections.map(conn => parseConn(conn, nodesLookup));

  // Find out the path for the output file.
  const outputFile = path.join(output, map.path.replace(input, ''));
  const outputPath = path.dirname(outputFile);

  try {
    const prevMap = require(outputFile);
    if (typeof prevMap.id === 'number') {
      parsedMap.id = prevMap.id;
    } else {
      lastID += 1;
      parsedMap.id = lastID;
    }
  } catch (err) {
    console.error(err);
  }

  // Create folder if it doesn't exist.
  if (!fs.existsSync(outputPath)) {
    mkdirs(outputPath);
  }

  // Write parsed map to new location.
  fs.writeFileSync(outputFile, JSON.stringify(parsedMap, null, 2));
}
