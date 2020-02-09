const { writeFileSync } = require("fs");
const maps = require("./maps.json");
const nodes = require("./nodes.json");
const resources = require("./resources.json");

function groupBy(list, attr) {
  const groups = {};

  list.forEach(item => {
    const key = item[attr];
    if (groups[key]) {
      groups[key].push(item);
    } else {
      groups[key] = [item];
    }
  });

  return groups;
}

// Remove unused attributes
const cleanResources = resources.map(res => ({
  mapID: res.mapID,
  resourceID: res.resourceID,
  category: res.category,
  parentID: res.parentID,
  text: res.text,
  url: res.url
}));

// Clean nodes titles
const cleanNodes = nodes.map(node => ({
  ...node,
  text: node.text.trim()
}));

// Grouped nodes and resources.
const r = groupBy(cleanResources, "mapID");
const n = groupBy(cleanNodes, "mapID");

// Compile maps.
Object.keys(maps).map(mapID => {
  const mapNodes = n[mapID];
  const mapResources = r[mapID];

  maps[mapID] = {
    ...maps[mapID],
    nodes: groupBy(mapNodes, "parentID"),
    resources: groupBy(mapResources, "parentID")
  };

  // Root node is an object and not a list.
  maps[mapID].nodes[null] = maps[mapID].nodes[null][0];
});

const output = JSON.stringify(maps, null, 2);
const outputMin = JSON.stringify(maps);

writeFileSync("./mapsFull.json", output);
writeFileSync("./mapsFull.min.json", outputMin);
