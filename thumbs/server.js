const readFileSync = require('fs').readFileSync;
const express = require('express');
const dot = require('dot');
const collection = require('../server/collection');
const generateThumbs = require('./generateThumbs');

const app = express();

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

  collection('maps', (db, coll) => {
    // Get the map from the DB.
    coll.findOne({ title })
      .then((result) => {
        res.send(render({ map: JSON.stringify(result) }));
        db.close();
      })
      .catch((err) => { throw err; });
  });
});

const server = app.listen(4000, () =>
  generateThumbs('http://0.0.0.0:4000/').then(() => server.close())
);

// chromium --headless --hide-scrollbars --remote-debugging-port=9222 --disable-gpu &
