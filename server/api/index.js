const express = require('express');
const maps = require('./maps');
const votes = require('./votes');
const resources = require('./resources');
const { logger } = require('../utils/errors');

// Group all API routers here, so we can import and use them with just
// one router on the server/index.js file.
const router = express.Router();
router.use('/maps', maps);
router.use('/votes', votes);
router.use('/resources', resources);

// Handle any error inside the endpoints.
router.use((err, req, res, next) => logger(err, res));


module.exports = router;
