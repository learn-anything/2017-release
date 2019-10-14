const express = require('express');
const { cache } = require('../utils/cache');
const Maps = require('../helpers/maps');
const { cacheKeys } = require('../constants.json');
const { logger } = require('../utils/errors');


const router = express.Router();

// Get suggestions for maps or get random map (if no query is specified).
router.get('/', (req, res) => {
  const q = req.query.q;

  const key = cacheKeys.maps.search + (q && q.replace(/\s/g, '-'));
  cache(key, Maps.fuzzySearch(q), 5)
    .then(data => res.send(data))
    .catch(err => logger(err, res));
});

// Get map by ID.
router.get('/:id(\\d+)', (req, res) => {
  cache(cacheKeys.maps.byID + req.params.id, Maps.byID(req.params.id), 0)
    .then(data => res.send(data))
    .catch(err => logger(err, res));
});

// Get map by title.
router.get(/\/(.*)/, (req, res) => {
  // Convert from "/path/to/map/" to "learn anything - path - to - map" format.
  let title = req.params[0]
    .replace(/\/$/, '')
    .replace(/-/g, ' ')
    .replace(/\//g, ' - ');

  if (!title.startsWith('learn anything')) {
    title = `learn anything - ${title}`;
  }

  Maps.byTitle(title)
    .then(data => res.send(data))
    .catch(err => logger(err, res));
});

module.exports = router;
