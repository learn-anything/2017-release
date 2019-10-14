const Memcached = require('memcached');
const crypto = require('crypto');

// Set default host to 'localhost'. If we're running on Docker environment use
// 'memcached'. If another IP is specified, use that one.
let host;
if (process.env.DOCKER) {
  host = 'mem';
}
if (process.env.MEMCACHED_HOST) {
  host = process.env.MEMCACHED_HOST;
}

const memcached = new Memcached([`${host}:11211`]);
const { logger } = require('./errors');


// Return a hash of the given string.
function hash(str) {
  const hash = crypto.createHash('sha256');
  hash.update(str);
  return hash.digest('hex');
}

// Get a value from memcached. Returns a Promise.
// Example use:
//  get('maps.byID.5')
//    .then(data => console.log(data))
function get(key) {
  return new Promise((resolve, reject) => {
    memcached.get(key, (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });
}

// Set a value on memcached. Returns a Promise.
// Example use:
//  set('maps.byID.5', map, 3*60*60)
//    .then(response => console.log(response))
function set(key, value, lifetime=0) {
  return new Promise((resolve, reject) => {
    memcached.set(key, value, lifetime, (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });
}

// Delete a value from memcached. Returns a Promise.
// Example use:
//  delete('maps.byID.5')
//    .then(response => console.log(response))
function del(key) {
  return new Promise((resolve, reject) => {
    memcached.delete(key, (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });
}


// Retrieve the value of a function from memcached, or cache it's result
// if not there. It's possible to specify the expiration (lifetime) of
// the cached value, and wether the key should be hashed or not.
function cache(key, fn, lifetime = 0, shouldHash = false) {
  return new Promise((resolve, reject) => {
    const hashedKey = hash(key);
    console.log('[MC] Get:', shouldHash ? hashedKey : key);

    // If shouldHash is true get the data by hashed key.
    get(shouldHash ? hashedKey : key)
      .then((cachedData) => {
        // If there's some data cached return that, and if the key was
        // hashed, check that the original (non-hashed) keys correspond.
        if (cachedData && (!shouldHash || (shouldHash && cachedData.key === key))) {
          console.log('[MC] Hit:', shouldHash ? hashedKey : key);
          resolve(shouldHash ? cachedData.value : cachedData);
          return;
        }

        if (typeof fn === 'object' && fn.then) {
          // fn is a Promise.
          return fn;
        }

        return fn();
      })
      .then((fnResult) => {
        if (fnResult) {
          // There was no cached data, so we store the result of the function
          // that was passed to `cache`.
          resolve(fnResult);
          console.log('[MC] Miss:', shouldHash ? hashedKey : key);

          let value = fnResult;

          if (shouldHash) {
            // If should hash is true, store the original key too. This will be
            // used to avoid retrieving wrong data in case of collisions
            // (different keys that generate the same hash).
            value = { value, key };
          }

          set(shouldHash ? hashedKey : key, value, lifetime)
            .then(data => console.log(`[MC] Cached: ${data}`))
            .catch(err => logger(err));
        }
      })
      .catch(err => logger(err));
  });
}

// Return a promise that resolves immediately, used when memcached
// is not available.
function fakePromise(key) {
  return new Promise(resolve => resolve());
}

// Fake cache function, used when memcached is not available.
function fakeCache(key, fn, lifetime, shouldHash) {
  if (typeof fn === 'object' && fn.then) {
    return fn;
  }

  return fn();
}


if (host) {
  module.exports = { cache, del, set, get };
} else {
  module.exports = {
    cache: fakeCache,
    del: fakePromise,
    set: fakePromise,
    get: fakePromise,
  };
}
