const { writeFile } = require('fs');
const sm = require('sitemap');
const AWS = require('aws-sdk');
const walkDir = require('./walkDir');

// Removes all attributes with empty strings from an object.
const clean = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      // If attribute is an object, iterate on all its items and clean them.
      if (obj[key].length) {
        obj[key].forEach(el => clean(el));
      } else {
        clean(obj[key]);
      }
    }

    if (obj[key] === '') {
      delete obj[key];
    }
  });

  return obj;
};

// Load AWS configuration file.
AWS.config.loadFromPath(`${__dirname}/AWSConfig.json`);
const docClient = new AWS.DynamoDB.DocumentClient();

// Used for generating the sitemap.
const sitemap = sm.createSitemap({ hostname: 'https://learn-anything.xyz' });
sitemap.add({ url: '/' });

// Used to avoid uploading the same map multiple times.
const visited = [];

// Promise to insert map into DB.
const put = map => new Promise((resolve, reject) => (
  setTimeout(() => (
    docClient.put({
      TableName: 'LA-maps',
      Item: clean(map),
    }, (err) => {
      if (err) {
        reject();
      }

      console.log(map.title);
      resolve(map.title);
    })
  ), 200)
));

// Resolves promise, will be used to chain all put promises.
let chain = new Promise(resolve => resolve());


console.log('Importing into DynamoDB...');
walkDir('maps', (map) => {
  const parsedMap = Object.assign({}, map);

  // Set the map key for search. If there's a tag use that,
  // otherwise use the leftmost topic on the title.
  if (map.tag) {
    parsedMap.key = map.tag;
  } else {
    const splitTitle = map.title.split(' - ');
    parsedMap.key = splitTitle[splitTitle.length - 1];
  }

  // Convert all spaces in the title with dashes.
  parsedMap.title = parsedMap.title.replace('learn anything - ', '').replace(/ /g, '-');

  if (visited.indexOf(parsedMap.title) === -1) {
    visited.push(parsedMap.title);

    // Add url of current map to sitemap.
    const url = `/${parsedMap.title.replace(/---/g, '/')}/`;
    sitemap.add({ url });

    if (parsedMap.title === '') {
      parsedMap.title = 'learn-anything';
    }

    chain = chain.then(() => put(parsedMap));
  }
});

writeFile(`client/sitemap.xml`, sitemap.toString(), () => (
  console.log('Maps loaded and sitemap created.')
));
