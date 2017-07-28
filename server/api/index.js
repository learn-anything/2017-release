const express = require('express');
const maps = require('./maps');

const router = express.Router();
router.use('/maps', maps);

module.exports = router;
