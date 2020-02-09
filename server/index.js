#!/usr/bin/env node
const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");

const app = express();

// Use hot reloading when in dev environment
if (process.env.NODE_ENV !== "production") {
  /* eslint-disable global-require */
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const webpackConfig = require("../webpack.config");
  /* eslint-enable global-require */

  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      hot: true,
      inline: true,
      stats: { color: true }
    })
  );

  app.use(webpackHotMiddleware(compiler));
}

// Compress files sent.
app.use(compression({ threshold: 0 }));

// Static files and api router.
app.use("/static", express.static("client/resources"));
app.use("/static", express.static("client/dist"));

app.get("*", (req, res) => {
  res.sendFile(`client/index.html`, { root: "${__dirname}/../" });
});

// Start the party on port 3000
app.listen(3000, () => {
  console.log("Server started.");
});
