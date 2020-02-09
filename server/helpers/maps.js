const suggestions = require("../data/suggestions.json");
const mapsData = require("../data/mapsFull.min.json");

const Fuse = require("fuse.js");
const { APIError } = require("../utils/errors");

const fuse = new Fuse(suggestions, { keys: ["key"] });
const suggestionsByTitle = suggestions.reduce(
  (obj, sugg) => ({ ...obj, [sugg.title]: sugg }),
  {}
);

// Fuzzy search maps by key name.
function fuzzySearch(query) {
  // If the query is specified search for that, otherwise return a
  // random document.
  if (query) {
    return fuse.search(query);
  }

  const randIndex = Math.floor(Math.random() * (suggestions.length - 1));
  return [suggestions[randIndex]];
}

// Get a specific map by ID.
function byID(mapID) {
  return mapsData[mapID];
}

// Get a specific map by title.
function byTitle(title) {
  const cleanTitle = title
    .replace(/^learn anything - /, "/")
    .replace(/ - /g, "/")
    .replace(/ /g, "-");
  const { id } = suggestionsByTitle[cleanTitle] || {};

  if (id === undefined) {
    throw new APIError(404, "map not found");
  }

  return byID(id);
}

module.exports = {
  fuzzySearch,
  byID,
  byTitle
};
