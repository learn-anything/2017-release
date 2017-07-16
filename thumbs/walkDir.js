const { resolve } = require('path');
const walk = require('fs-walk').walkSync;

const ignoreFiles = ['AWSConfig.json', 'package.json', 'package-lock.json'];
const ignoreDirs = ['node_modules'];

/*
 * Recursively walk a directory and call a function on all its json files.
 * Imported file and absolute path are the parameters passed to
 * the callback function.
 */
const walkDir = (dirname, fn) => {
  walk(dirname, (basedir, filename, stat) => {
    const absPath = resolve('./', basedir, filename);

    if (stat.isDirectory()) {
      // Don't walk ignored folders.
      if (ignoreDirs.indexOf(filename) !== -1) {
        return;
      }
      return walkDir(absPath, fn);
    }

    // Ignore files in ignored folders.
    let ignore = false;
    ignoreDirs.forEach((dir) => {
      if (basedir.indexOf(dir) !== -1) {
        ignore = true;
      }
    });

    if (ignore) {
      return;
    }

    if (typeof fn === 'function' &&
      absPath.endsWith('.json') &&
      ignoreFiles.indexOf(filename) === -1) {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      fn(require(absPath), absPath);
    }

    return null;
  });
};

module.exports = walkDir;

