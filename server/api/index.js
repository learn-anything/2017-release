const express = require('express');
const maps = require('./maps');
const votes = require('./votes');

const router = express.Router();
router.use('/maps', maps);
router.use('/votes', votes);

module.exports = router;
