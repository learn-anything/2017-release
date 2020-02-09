#!/usr/bin/env node
const { readFileSync } = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const dot = require("dot");

const api = require("./api/index");

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

// JSON encoded bodies on POST requests.
app.use(bodyParser.json());

// Static files and api router.
app.use("/static", express.static("client/resources"));
app.use("/static", express.static("client/dist"));
app.use("/api", api);

// Templating engine for dynamic meta tags.
const render = dot.template(readFileSync(`${__dirname}/../client/index.html`));

// TODO: need to add language support, and automatic redirect when the path is
// just the id of a map.
// :map-id([0-9])*
// :lang([a-z]{2})?*
app.get("*", (req, res) => {
  // If the client is requesting the main page, return that.
  if (req.path === "/") {
    // Render main page.
    res.send(
      render({
        title: "Learn Anything",
        description: "Search Interactive Mind Maps to learn anything",
        url: `${req.protocol}://${req.headers.host}${req.path}`,
        // image: `${req.protocol}://${req.headers.host}/thumbs/learn-anything`,
        language: "en"
      })
    );
    return;
  }

  // Otherwise, render the meta tags for any other map.
  // Generate map name and topic of the map.
  const title = req.path
    .slice(1)
    .replace(/\/$/, "")
    .replace(/\//g, "---");
  const splitTitle = req.path.split("---");
  const topic = splitTitle[splitTitle.length - 1].replace(/-/g, " ").trim(" ");

  // TMP
  res.send(
    render({
      title: "Learn Anything",
      description: "Search Interactive Mind Maps to learn anything",
      url: `${req.protocol}://${req.headers.host}${req.path}`,
      // image: `${req.protocol}://${req.headers.host}/thumbs/learn-anything`,
      language: "en"
    })
  );
});

// Start the party on port 3000
app.listen(3000, () => {
  console.log("Server started.");
  console.log("HOST_IP: ", process.env.HOST_IP);
});
