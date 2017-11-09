const express = require('express');
const maps = require('./maps');
const votes = require('./votes');


// Group all API routers here, so we can import and use them with just
// one router on the server/index.js file.
const router = express.Router();
router.use('/maps', maps);
router.use('/votes', votes);


module.exports = router;
