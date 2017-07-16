const readFileSync = require('fs').readFileSync;
const express = require('express');
const dot = require('dot');
const AWS = require('aws-sdk');
const generateThumbs = require('./generateThumbs');

const app = express();

// Update AWS configuration.
AWS.config.update({
  region: 'us-west-1',
  accessKeyId: process.env.DYNAMO_READ_KEY_ID,
  secretAccessKey: process.env.DYNAMO_READ_SECRET_ACCESS_KEY,
});
const docClient = new AWS.DynamoDB.DocumentClient();

app.get('/static/bundle.js', (req, res) => {
  res.sendFile('dist/bundle.js', { root: __dirname });
});

// Templating engine used for react server side rendering
const render = dot.template(readFileSync(`${__dirname}/index.html`));

app.get('*', (req, res) => {
  // Generate map name and topic of the map.
  let title = req.originalUrl.slice(1).replace(/\//g, '---');

  if (title !== 'learn-anything') {
    title = title.replace('learn-anything---', '');
  }

  docClient.query({
    TableName: 'LA-maps',
    KeyConditionExpression: '#title = :title',
    ExpressionAttributeNames: { '#title': 'title' },
    ExpressionAttributeValues: { ':title': title },
  }, (err, data) => {
    if (err) {
      res.status(500).send(JSON.stringify(err));
      return;
    }

    if (data.Items.length) {
      res.send(render({ map: JSON.stringify(data.Items[0]) }));
      return;
    }

    res.status(404).send(`Map ${title} not found.`);
  });
});

const server = app.listen(4000, () => (
  generateThumbs('http://0.0.0.0:4000/').then(() => server.close())
));
