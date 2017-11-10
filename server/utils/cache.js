const Memcached = require('memcached');
const memcached = new Memcached([`${process.env.HOST_IP}:11211`]);
const crypto = require('crypto');


// Return a hash of the given string.
function hash(str) {
  const hash = crypto.createHash('sha256');
  hash.update(key);
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


//
function cache(key, fn, lifetime, shouldHash = false) {
  return new Promise((resolve, reject) => {
    const hashedKey = hash(key);
    console.log('[MC] Get: ', shouldHash ? hashedKey : key);

    // If should hash is true get the data by hashed key.
    get(shouldHash ? hashedKey : key)
      .then((cachedData) => {
        // If there's some data cached return that, and
        // if the key was hashed, checkt hat the original keys correspond.
        if (cachedData && (!shouldHash || (shouldHash && cachedData.key === key))) {
          console.log('[MC] Hit');
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
          console.log('[MC] Miss');

          let value = fnResult;

          if (shouldHash) {
            // If should hash is true store the original key too. This will be
            // used to retrieve wrong data in case of collisions (different keys
            // that generate the same hash).
            value = { value, key };
          }

          set(shouldHash ? hashedKey : key, JSON.stringify(value), lifetime)
            .then(data => console.log(`[MC] Cached: ${data}`))
            .catch(err => reject(err));
        }
      })
      .catch(err => reject(err));
  });
}

function fakeCache(key, fn) {
  if (typeof fn === 'object' && fn.then) {
    return fn;
  }

  return fn();
}

/*
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
*/


module.exports = process.env.HOST_IP ? cache : fakeCache;
