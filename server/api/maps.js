const express = require('express');
const cache = require('../utils/cache');
const {
  getMapByID,
  getMapByTitle,
  searchMapByKey,
} = require('../helpers/maps');


// 2 hours cache lifetime for maps
const CACHE_LIFETIME = 2 * 60 * 60;


const router = express.Router();


// Search map by key (name of map) or get random map (if no query is specified).
router.get('/', (req, res) => {
  const q = req.query.q;

  const cacheKey = `map.byKey("${q.replace(/\s/g, '-')}")`;
  cache(cacheKey, searchMapByKey(q), 20)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err));
});

// Get map by ID.
router.get('/:id(\\d+)', (req, res) => {
  cache(`map.byID("${req.params.id}")`, getMapByID(req.params.id), 300)
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

  const cacheKey = `maps.byTitle("${title.replace(/\s/g, '-')}")`;
  cache(cacheKey, getMapByTitle(title), 300)
    .then(data => res.send(data))
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

module.exports = router;
