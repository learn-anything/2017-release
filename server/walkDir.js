const { resolve } = require('path');
const walk = require('fs-walk').walkSync;

/*
 * Recursively walk a directory and call a function on all its json files.
 * Imported file and absolute path are the parameters passed to
 * the callback function.
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

module.exports = walkDir;
