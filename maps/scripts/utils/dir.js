const path = require('path');
const fs = require('fs-extra');


// Files and directories to avoid on walkDir.
const ignoredFiles = ['package.json', 'package-lock.json'];
const ignoredDirs = ['node_modules', 'media', 'scripts', 'maps'];

/*
 * Generator that recursively walks into a specified directory.
 * Yields the content of each file.
 */
function *walkDir(dirname) {
  // Read all files in specified directory and loop through them.
  for (let file of fs.readdirSync(dirname)) {
    const absPath = path.resolve('./', dirname, file);
    const stat = fs.statSync(absPath);

    if (stat.isDirectory()) {
      // Don't walk on ignored directories
      if (ignoredDirs.includes(file)) {
        continue;
      }

      yield *walkDir(absPath);
    }

    if (file.endsWith('.json') && !ignoredFiles.includes(file)) {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      yield { data: require(absPath), path: absPath };
    }
  }
};

/*
 * Equivalent to mkdir -p dirname.
 */
function mkdirs(dirname) {
  const parentDir = path.dirname(dirname);

  if (!fs.existsSync(parentDir)) {
    mkdirs(parentDir);
  }

  fs.mkdirSync(dirname);
}


module.exports = {
  walkDir,
  mkdirs,
};
