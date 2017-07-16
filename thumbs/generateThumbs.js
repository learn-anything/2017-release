const CDP = require('chrome-remote-interface');
const path = require('path');
const fs = require('fs');
const walkDir = require('./walkDir');

const width = 1200;
const height = 630;
const delay = 1000;

/*
 * Equivalent to mkdir -p dirname.
 */
const mkdirs = (dirname) => {
  const parentDir = path.dirname(dirname);

  if (!fs.existsSync(parentDir)) {
    mkdirs(parentDir);
  }

  fs.mkdirSync(dirname);
};

const generateThumbs = url => new Promise((res) => {
  // Start the Chrome Debugging Protocol.
  CDP(async (client) => {
    const { DOM, Emulation, Network, Page } = client;
    const deviceMetrics = {
      width,
      height,
      mobile: false,
      fitWindow: true,
      deviceScaleFactor: 0,
    };

    await Promise.all([
      Page.enable(),
      DOM.enable(),
      Network.enable(),
      Emulation.setDeviceMetricsOverride(deviceMetrics),
      Emulation.setVisibleSize({ width, height }),
    ]);

    const takeScreenshot = mapPath => new Promise((resolve) => {
      Page.navigate({ url: url + mapPath });

      // Executed once, when the page finishes loading.
      client.once('Page.loadEventFired', () => setTimeout(() => {
        Page.captureScreenshot({ format: 'jpg' }).then((screenshot) => {
          const buffer = new Buffer(screenshot.data, 'base64');
          const output = `${__dirname}/${mapPath}.jpg`;

          // Create folder if it doesn't exist.
          if (!fs.existsSync(path.dirname(output))) {
            mkdirs(path.dirname(output));
          }

          // Save screenshot.
          fs.writeFileSync(output, buffer, 'base64');
          console.log(`Saved --> ${mapPath}`);

          // Resolve promise.
          resolve();
        });
      }, delay));
    });

    // Convert map title to path.
    const titleToPath = title => title.replace(/ /g, '-').replace(/---/g, '/');
    const paths = [];

    // Resolves promise, will be used to chain all takeScreenshot promises.
    let chain = new Promise(resolve => resolve());

    walkDir('maps', (map) => {
      const p = titleToPath(map.title);

      if (paths.indexOf(p) === -1) {
        chain = chain.then(() => takeScreenshot(p));
        paths.push(p);
      }
    });

    // Close connection to debugger.
    chain = chain.then(() => {
      client.close();
      res();
    });
  }).on('error', (err) => { throw err; });
});

module.exports = generateThumbs;
