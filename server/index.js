const express = require('express');
const mapsLookup = require('./mapsLookup');

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Maps by mindnode ID
app.get('/maps-lookup/:id', (req, res) => {
  let title = mapsLookup[req.params.id];
  title = title.replace(/learn anything - /, '').replace(/ \- /g, '/').replace(/ /g, '_');

  res.send(JSON.stringify({ title }));
});

// Maps by map title
app.get(/maps\/(.*)/, (req, res) => {
  let filename = `${req.params[0].replace(/\//g, '_-_')}.json`;

  if (filename !== 'learn_anything.json') {
    filename = `learn_anything_-_${filename}`;
  }

  res.sendFile(filename, { root: 'maps'});
});

// Static files.
app.get('/static/bundle.js', (req, res) => {
  res.sendFile('dist/bundle.js', { root: 'client'});
});
app.get('/static/analytics.js', function (req, res) {
  res.sendFile('utils/analytics.js', { root: 'client'});
});

// HTML and favicon.
app.get('/favicon.ico', (req, res) => {
  res.sendFile('favicon.png', { root: 'client'});
});
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'client'});
});

app.listen(3000);
