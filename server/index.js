#!/usr/bin/env node
const compression = require('compression');
const express = require('express');

const isDev = process.env.NODE_ENV !== 'production';
const app = express();

if (isDev) {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack.config');

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
  let filename = `${req.params[0]}.json`;

  if (filename !== 'learn-anything.json') {
    filename = `learn-anything/${filename}`;
  }

  res.send(JSON.stringify(require(`../maps/${filename}`), null, 0));
});

// Static files.
app.get('/static/bundle.js', (req, res) => {
  res.sendFile('dist/bundle.js', { root: 'client' });
});

// HTML and favicon.
app.get('/favicon.png', (req, res) => {
  res.sendFile('favicon.png', { root: 'client' });
});
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'client' });
});

app.listen(3000);
