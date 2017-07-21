#!/usr/bin/env node
const compression = require('compression');
const readFileSync = require('fs').readFileSync;
const express = require('express');
const dot = require('dot');
const AWS = require('aws-sdk');

// Update AWS configuration.
AWS.config.update({
  region: 'us-west-1',
  accessKeyId: process.env.DYNAMO_READ_KEY_ID,
  secretAccessKey: process.env.DYNAMO_READ_SECRET_ACCESS_KEY,
});
const docClient = new AWS.DynamoDB.DocumentClient();

const isDev = process.env.NODE_ENV !== 'production';
const app = express();


if (isDev) {
  /* eslint-disable global-require */
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack.config');
  /* eslint-enable global-require */

  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    inline: true,
    stats: { color: true },
  }));

  app.use(webpackHotMiddleware(compiler));
}


// Compress static files.
app.use(compression({ threshold: 0 }));

// Maps by map title.
app.get(/maps\/(.*)/, (req, res) => {
  const title = req.params[0].replace(/\/$/, '').replace(/\//g, '---').replace(/\?.*/, '');

  docClient.query({
    TableName: 'la-maps',
    KeyConditionExpression: '#title = :title',
    ExpressionAttributeNames: { '#title': 'title' },
    ExpressionAttributeValues: { ':title': title },
  }, (err, data) => {
    if (err) {
      res.status(500).send(JSON.stringify(err));
      return;
    }

    if (data.Items.length) {
      res.send(JSON.stringify(data.Items[0]));
      return;
    }

    res.status(404).send(`Map ${title} not found.`);
  });
});

// Thumbnail by map title.
app.get(/thumbs\/(.*)/, (req, res) => {
  let filename = `${req.params[0]}.jpg`;

  if (filename !== 'learn-anything.jpg') {
    filename = `learn-anything/${filename}`;
  }

  res.sendFile(filename, { root: 'thumbs' });
});

// Static files.
app.get('/static/bundle.js', (req, res) => {
  res.sendFile('dist/bundle.js', { root: 'client' });
});

// HTML and favicon.
app.get('/favicon.png', (req, res) => {
  res.sendFile('favicon.png', { root: 'client' });
});

// Sitemap
app.get('/sitemap.xml', (req, res) => {
  res.sendFile('sitemap.xml', { root: 'client' });
});

// Templating engine for dynamic meta tags.
const render = dot.template(readFileSync(`${__dirname}/../client/index.html`));

app.get('*', (req, res) => {
  let title = req.originalUrl.replace(/\?.*/, '');
  if (title === '/') {
    // Render main page.
    res.send(render({
      title: 'Learn Anything',
      description: 'Search Interactive Mind Maps to learn anything',
      url: `${req.protocol}://${req.headers.host}${title}`,
      image: `${req.protocol}://${req.headers.host}/thumbs/learn-anything`,
    }));
  } else {
    // Render any other map.
    // Generate map name and topic of the map.
    title = title.slice(1).replace(/\/$/, '').replace(/\//g, '---');
    const splitTitle = title.split('---');
    const topic = splitTitle[splitTitle.length - 1].replace(/-/g, ' ').trim(' ');

    docClient.query({
      TableName: 'la-maps',
      KeyConditionExpression: '#title = :title',
      ExpressionAttributeNames: { '#title': 'title' },
      ExpressionAttributeValues: { ':title': title },
    }, (err, data) => {
      if (err) {
        res.status(500).send(JSON.stringify(err));
        return;
      }

      if (data.Items.length) {
        const result = data.Items[0];

        res.send(render({
          title: result.key || topic,
          description: result.description || `Learn ${result.key || topic} with hand curated mind maps.`,
          url: `${req.protocol}://${req.headers.host}${title}`,
          image: `${req.protocol}://${req.headers.host}/thumbs${title}`,
        }));
        return;
      }

      res.status(404).send(`Map ${title} not found.`);
    });
  }
});

app.listen(3000, () => console.log('Server started.'));
