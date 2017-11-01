const Memcached = require('memcached');
const memcached = new Memcached(['0.0.0.0:11211']);

// Generate a key from the request.
const getKey = (req) => {
  let key = `${req.method}/${req.url}/`;

  if (req.method === 'GET') {
    key += JSON.stringify(req.query);
  } else {
    key += JSON.stringify(req.body);
  }

  // Remove spaces and newlines
  return key.replace(/[ \n]/g, '');
};

// Check if the request has a response cached, and in case
// it does, send that back to the client.
const middleware = (req, res, next) => {
  const key = getKey(req);
  console.log('[MCG] Key: ', key);

  memcached.get(key, (err, data) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    if (data) {
      // The request has a response cached, send it back and you're done
      res.send(data);
      return;
    }

    // The request has no response cached
    next();
  });
};


// Cache the response for the current request.
const set = (req, data, lifetime = 10) => {
  const key = getKey(req);
  console.log('[MCS] Key: ', key);

  memcached.set(key, JSON.stringify(data), lifetime, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('[MCS] Cached: ', data);
  });
};

module.exports = { middleware, set };
