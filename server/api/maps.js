const express = require("express");
const Maps = require("../helpers/maps");
const { logger } = require("../utils/errors");

const router = express.Router();

// Get suggestions for maps or get random map (if no query is specified).
router.get("/", (req, res) => {
  const data = Maps.fuzzySearch(req.query.q);
  res.send(data);
});

// Get map by ID.
router.get("/:id(\\d+)", (req, res) => {
  const data = Maps.byID(req.params.id);
  res.send(data);
});

// Get map by title.
router.get(/\/(.*)/, (req, res) => {
  // Convert from "/path/to/map/" to "learn anything - path - to - map" format.
  let title = req.params[0]
    .replace(/\/$/, "")
    .replace(/-/g, " ")
    .replace(/\//g, " - ");

  if (!title.startsWith("learn anything")) {
    title = `learn anything - ${title}`;
  }

  const data = Maps.byTitle(title);
  res.send(data);
});

module.exports = router;
