const { resolve } = require('path');
const fs = require('fs');
const walk = require('fs-walk').walk;
const collection = require('./collection');

/*
 * Recursively walk a directory and call a function on all its json files.
 * Imported file and absolute path are the parameters passed to the callback function.
 */
const walkDir = (dirname, fn) => {
  walk(dirname, (basedir, filename, stat) => {
    const absPath = resolve('./', basedir, filename);

    if (stat.isDirectory()) {
      return walkDir(absPath, fn);
    }

    if (typeof fn === 'function' && absPath.endsWith('.json')) {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      fn(require(absPath), absPath);
    }

    return null;
  });
};

collection('maps', (db, collection) => {
  walkDir('maps', (map, filename) => {
    const splitTitle = map.title.split('-');
    map.key = splitTitle[splitTitle.length - 1].trim(' ');
    map.title = map.title.replace('learn anything - ', '').replace(/ /g, '-');

    if (map.title === '') {
      map.title = 'learn-anything';
    }

    collection.updateOne({ title: map.title }, { $set: map }, { upsert: true })
      .then((result) => {
        console.log(result.message.documents);
      })
      .catch((err) => { throw err; });
  });

  setTimeout(() => {
    collection.find({}, { key: 1, title: 1, _id: 0 }).toArray()
      .then((result) => {
        fs.writeFile('client/utils/triggers.json', JSON.stringify(result), (err) => {
          if (err) {
            throw err;
          }

          db.close();
        });
      });
  }, 2000);
});
