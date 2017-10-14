const express = require('express');
const maps = require('./maps');
const vote = require('./vote');

const router = express.Router();
router.use('/maps', maps);
router.use('/vote', vote);

module.exports = router;
