#!/usr/bin/env node
const compression = require('compression');
const readFileSync = require('fs').readFileSync;
const express = require('express');
const dot = require('dot');
const collection = require('./collection');

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
  collection('maps', (db, coll) => {
    const title = req.params[0].replace(/\//g, '---');

    coll.findOne({ title }).then((result) => {
      res.send(JSON.stringify(result));
      db.close();
    });
  });
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
  if (req.originalUrl === '/') {
    // Render main page.
    res.send(render({
      title: 'Learn Anything',
      description: 'Search Interactive Mind Maps to learn anything',
      url: `https://learn-anything.xyz${req.originalUrl}`,
    }));
  } else {
    // Render any other map.
    // Generate map name and topic of the map.
    const title = req.originalUrl.slice(1).replace(/\//g, '---');
    const splitTitle = title.split('---');
    const topic = splitTitle[splitTitle.length - 1].replace(/-/g, ' ').trim(' ');

    collection('maps', (db, coll) => {
      // Get the map from the DB.
      coll.findOne({ title }).then((result) => {
        // Specify the content of the OG tags.
        res.send(render({
          title: result.key || topic,
          description: result.description || `Learn ${result.key || topic} with hand curated mind maps.`,
          url: `https://learn-anything.xyz${req.originalUrl}`,
        }));
        db.close();
      });
    });
  }
});

app.listen(3000);
