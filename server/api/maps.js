const express = require('express');
const { cache } = require('../utils/cache');
const Maps = require('../helpers/maps');
const { cacheKeys } = require('../constants.json');


const router = express.Router();

// Get suggestions for maps or get random map (if no query is specified).
router.get('/', (req, res) => {
  const q = req.query.q;

  const key = cacheKeys.maps.search + (q && q.replace(/\s/g, '-'));
  cache(key, Maps.fuzzySearch(q), 20)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err));
});

// Get map by ID.
router.get('/:id(\\d+)', (req, res) => {
  cache(cacheKeys.maps.byID + req.params.id, Maps.byID(req.params.id), 300)
    .then(data => res.send(data))
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
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

  const key = cacheKeys.maps.byTitle + title.replace(/\s/g, '-');
  cache(key, Maps.byTitle(title), 300)
    .then(data => res.send(data))
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

module.exports = router;
