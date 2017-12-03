#!/bin/env node
const map = require('../learn-anything/art/live-coding.json');
const fs = require('fs');
const timeit = require(`${__dirname}/utils/timeit`);
const { walkDir } = require(`${__dirname}/utils/dir`);


const cleanResource = (resource) => {
  resource.text = resource.text.trim();

  if (resource.text.length === 0) {
    if (resource.url.match(/https?:\/\/www\.reddit\.com\/r/)) {
      // match /r/subreddit
      const subreddit = resource.url.match(/\/r\/[^\/]*/);
      resource.text = subreddit[0];
    } else if (resource.url.match(/https?:\/\/github\.com\//)) {
      const repo = resource.url.replace(/.*github\.com\//, '').replace(/\/$/, '');
      resource.text = repo;
    } else {
      return false;
    }
  }

  // Strip steps.
  resource.text = resource.text.replace(/[1-5]\. /, '');

  // Find year in resource text, strip it and save it on a
  // different attribute.
  const yearMatch = resource.text.match(/^[0-9]{2,4}: /);
  if (yearMatch) {
    const year = yearMatch[0].replace(/:.*/, '');
    resource.year = year.length === 2 ? `20${year}` : year;
  }
  resource.text = resource.text.replace(/^[0-9]{2,4}: /, '');

  // Uppercase first letter of titles.
  resource.text = resource.text[0].toUpperCase() + resource.text.slice(1);
  resource.text = resource.text.trim();
  return resource;
};

const cleanNodes = nodes => nodes.map((node) => {
  node.text = node.text[0].toUpperCase() + node.text.slice(1);
  // TODO - after map, filter out false values.
  node.resources = node.resources.map(cleanResource).filter(res => res);

  if (node.nodes) {
    node.nodes = cleanNodes(node.nodes);
  }

  return node;
});

const cleanMaps = () => {
  const visited = [];

  for (let map of walkDir(`./learn-anything`)) {
    if (!visited.includes(map.data.title)) {
      visited.push(map.data.title);
      const newMap = cleanNodes([map.data.map])[0];
      map.data.map = newMap;
      fs.writeFileSync(map.path, JSON.stringify(map.data, null, 2));
    }
  }
};

timeit(cleanMaps);
