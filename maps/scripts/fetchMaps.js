const path = require('path');
const fs = require('fs-extra');
const axios = require('axios');
const PromisePool = require('es6-promise-pool');
const triggers = require(`${__dirname}/utils/triggers.json`);

const maxConcurrentConnections = 6;

// Equivalent to mkdir -p dirname.
async function mkdirs(dirname) {
  const parentDir = path.dirname(dirname);

  // If parent doesn't exist create it.
  if (!(await fs.exists(parentDir))) {
    await mkdirs(parentDir);
  }

  try {
    await fs.mkdir(dirname);
  } catch (err) {
    if (err.code === 'EEXIST') return;

    console.error(err.message);
    console.error(err);
    process.exit();
  }
}

// Fetch map and save to the right location.
async function fetchMap(trigger) {
  const id = trigger.id.replace(/#.*/, '');

  let map = (await axios.get(`https://my.mindnode.com/${id}.json`)).data;
  map = JSON.stringify(map).replace(/https:\/\/my\.mindnode\.com\//g, '/id/');
  map = JSON.parse(map);
  map.trigger = trigger.tag;

  // Convert title from 'path - to - map' to 'maps/path/to/map.json'.
  const outputFile = map.title
    .replace(/ - /g, '/')
    .replace(/ /g, '-')
    .replace(/^/, 'maps/')
    .replace(/$/, '.json');
  const outputDir = path.dirname(outputFile);

  // Create directory if it doesn't exist.
  if (!(await fs.exists(outputDir))) {
    await mkdirs(outputDir);
  }

  // Write map to file.
  await fs.writeFile(outputFile, JSON.stringify(map));
  console.log(trigger.tag);
}

// Fetch all maps on triggers.json
async function fetchMaps() {
  const startTime = new Date();
  let index = 0;

  const pool = new PromisePool(() => {
    if (index < triggers.length) {
      return fetchMap(triggers[index++]);
    }

    return null;
  }, maxConcurrentConnections);

  await pool.start();
  const duration = (new Date() - startTime) / 1000;
  console.log(`${index} maps added in ${duration}s.`);
}


fetchMaps()
  .then(() => console.log('done'))
  .catch((err) => {
    console.error(err.message);
    console.error(err);
    process.exit(1);
  });
