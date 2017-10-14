const express = require('express');
const jwtCheck = require('../utils/jwtCheck');

const router = express.Router();
// This endpoint requires authentication
router.use(jwtCheck('vote:maps'));

router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ msg: 'unauthorized' });
  }
});

router.get('/test', (req, res) => {
  res.send({ msg:  'it works' });
});

router.post('/test', (req, res) => {
  res.send({ msg:  'it works post' });
});


module.exports = router;
