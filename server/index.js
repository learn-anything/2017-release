#!/usr/bin/env node
const { readFileSync } = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const dot = require('dot');

const api = require('./api/index');
const csp = require('helmet-csp');
const securityHelper = require('./utils/secureUtil');

const app = express();
const googleTrackingID = process.env.NODE_ENV === 'production' ? 'UA-74470910-2' : '';


// Use hot reloading when in dev environment
if (process.env.NODE_ENV !== 'production') {
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

if (process.env.NODE_ENV === 'production') {
  app.use(securityHelper.noSniff());
  app.use(securityHelper.xFrame('SAMEORIGIN'));
  app.use(csp({
    directives: {
      defaultSrc: ["'self'"],
      fontSrc: [
        '*',
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        'https://fonts.googleapis.com/css',
      ],
      scriptSrc: [
        "'self'",
        'https://www.googletagmanager.com',
        'https://fonts.googleapis.com',
        'https://www.google-analytics.com/analytics.js',
        "'nonce-EDNnf03nceIOfn39fn3e9h3sdfa'",
      ],
      imgSrc: [
        "'self'",
        'https://www.google-analytics.com/r/collect',
        'https://www.google-analytics.com/collect',
      ],
      connectSrc: [
        "'self'",
        'https://learn-anything.auth0.com/.well-known/jwks.json'
      ],
      baseUri: ["'self'"],
      objectSrc: ["'none'"],
    },
  }));
}

// Compress files sent.
app.use(compression({ threshold: 0 }));

// JSON encoded bodies on POST requests.
app.use(bodyParser.json());

// Static files and api router.
app.use('/static', express.static('client/resources'));
app.use('/static', express.static('client/dist'));
app.use('/api', api);


// Templating engine for dynamic meta tags.
const render = dot.template(readFileSync(`${__dirname}/../client/index.html`));


// TODO: need to add language support, and automatic redirect when the path is
// just the id of a map.
// :map-id([0-9])*
// :lang([a-z]{2})?*
app.get('*', (req, res) => {
  // If the client is requesting the main page, return that.
  if (req.path === '/') {
    // Render main page.
    res.send(render({
      googleTrackingID,
      title: 'Learn Anything',
      description: 'Search Interactive Maps to learn anything',
      url: `${req.protocol}://${req.headers.host}${req.path}`,
      // image: `${req.protocol}://${req.headers.host}/thumbs/learn-anything`,
      language: 'en',
    }));
    return;
  }

  // Otherwise, render the meta tags for any other map.
  // Generate map name and topic of the map.
  const title = req.path.slice(1).replace(/\/$/, '').replace(/\//g, '---');
  const splitTitle = req.path.split('---');
  const topic = splitTitle[splitTitle.length - 1].replace(/-/g, ' ').trim(' ');

  // TMP
  res.send(render({
    googleTrackingID,
    title: 'Learn Anything',
    description: 'Search Interactive Maps to learn anything',
    url: `${req.protocol}://${req.headers.host}${req.path}`,
    // image: `${req.protocol}://${req.headers.host}/thumbs/learn-anything`,
    language: 'en',
  }));
});


// Start the party on port 3000
app.listen(3000, () => {
  console.log('Server started.');
  const envs = [
    'NODE_ENV',
    'DOCKER',
    'MEMCACHED_HOST',
    'DYNAMODB_HOST',
    'ELASTICSEARCH_HOST',
  ];
  envs.forEach(env => console.log(`${env}: ${process.env[env]}`));
});
