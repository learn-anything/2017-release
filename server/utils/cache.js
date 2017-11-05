const Memcached = require('memcached');
const memcached = new Memcached([`${process.env.HOST_IP}:11211`]);
const crypto = require('crypto');


// Get a value from memcached
const get = (key) => new Promise((resolve, reject) => {
  memcached.get(key, (err, data) => {
    if (err) {
      reject(err);
    }

    resolve(data);
  });
});

// Set a value on memcached
const set = (key, value, lifetime=10) => new Promise((resolve, reject) => {
  memcached.set(key, value, lifetime, (err, data) => {
    if (err) {
      reject(err);
    }

    resolve(data);
  });
});


const cache = (key, fn, lifetime = 10, shouldHash = false) => new Promise((resolve, reject) => {
  const hash = crypto.createHash('sha256');
  hash.update(key);
  const keyHash = hash.digest('hex');


  console.log('[MC] Get:', shouldHash ? keyHash : key);

  get(shouldHash ? keyHash : key)
    .then((cachedData) => {
      // If there's some data cached return that, and
      // if the key was hashed, check that the original keys correspond.
      if (cachedData && (!shouldHash || (shouldHash && cachedData.key === key))) {
        console.log('[MC] HIT');
        resolve(shouldHash ? chachedData.value : cachedData);
        return;
      }

      // fn is a Promise
      if (typeof fn === 'object' && fn.then) {
        return fn;
      }

      return fn();
    })
    .then((fnResult) => {
      if (fnResult) {
        // There was no cached data, so we cache the result of the function
        // that was passed to `cache`.
        resolve(fnResult);

        console.log('[MC] MISS');
        let value = fnResult;

        if (shouldHash) {
          value = { value, key: key };
        }

        set(shouldHash ? keyHash : key, JSON.stringify(value), lifetime)
          .then(data => console.log('[MC] Cached:', data))
          .catch(err => reject(err));
      }
    })
    .catch(err => reject(err));
});

const fakeCache = (key, fn) => {
  if (typeof fn === 'object' && fn.then) {
    return fn;
  }

  return fn();
};

module.exports = process.env.HOST_IP ? cache : fakeCache;
