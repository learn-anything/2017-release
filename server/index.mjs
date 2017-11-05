#!/usr/bin/env node
import compression from 'compression';
import { readFileSync } from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import dot from 'dot';
import api from './api/index';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

const app = express();
const googleTrackingID = process.env.NODE_ENV === 'production' ? 'UA-74470910-2' : '';

// If on dev environment use hot reloading.
if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    inline: true,
    stats: { color: true },
  }));

  app.use(webpackHotMiddleware(compiler));
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

// :lang([a-z]{2})?*
// Todo redirect urls with map IDs to urls with map paths :map-id([0-9])*
app.get('*', (req, res) => {
  let title = req.originalUrl.replace(/\?.*/, '');

  if (title === '/') {
    // Render main page.
    res.send(render({
      googleTrackingID,
      title: 'Learn Anything',
      description: 'Search Interactive Mind Maps to learn anything',
      url: `${req.protocol}://${req.headers.host}${title}`,
      image: `${req.protocol}://${req.headers.host}/thumbs/learn-anything`,
      language: 'en',
    }));
  } else {
    // Render any other map.
    // Generate map name and topic of the map.
    title = title.slice(1).replace(/\/$/, '').replace(/\//g, '---');
    const splitTitle = title.split('---');
    const topic = splitTitle[splitTitle.length - 1].replace(/-/g, ' ').trim(' ');

    // TMP
    res.send(render({
      googleTrackingID,
      title: 'Learn Anything',
      description: 'Search Interactive Mind Maps to learn anything',
      url: `${req.protocol}://${req.headers.host}${title}`,
      // image: `${req.protocol}://${req.headers.host}/thumbs/learn-anything`,
      language: 'en',
    }));
  }
});

app.listen(3000, () => {
  console.log('Server started.');
  console.log('HOST_IP: ', process.env.HOST_IP);
});
