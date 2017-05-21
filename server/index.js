const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://my.mindnode.com/");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Maps.
app.get('/maps/:id', (req, res) => {
  res.sendFile(`${req.params.id}.json`, { root: 'maps'});
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
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'client'});
});

app.listen(3000);
