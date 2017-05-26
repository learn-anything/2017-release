const express = require('express');
const lookup = require('./lookup');

const app = express();

// Maps by mindnode ID.
app.get('/maps-lookup/:id', (req, res) => {
  const map = lookup.find(entry => entry.id === req.params.id);

  if (!map) {
    res.status(404).send('Can\'t find map.');
    return;
  }

  const title = map.title.replace(/learn anything - /, '').replace(/ - /g, '/').replace(/ /g, '_');
  res.send(JSON.stringify({ title }));
});

// Maps by map title.
app.get(/maps\/(.*)/, (req, res) => {
  let filename = `${req.params[0]}.json`;

  if (filename !== 'learn_anything.json') {
    filename = `learn_anything/${filename}`;
  }

  res.sendFile(filename, { root: 'maps' });
});

// Static files.
app.get('/static/bundle.js', (req, res) => {
  res.sendFile('dist/bundle.js', { root: 'client' });
});
app.get('/static/analytics.js', (req, res) => {
  res.sendFile('utils/analytics.js', { root: 'client' });
});

// HTML and favicon.
app.get('/favicon.ico', (req, res) => {
  res.sendFile('favicon.png', { root: 'client' });
});
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'client' });
});

app.listen(3000);
