const suggestions = require("../data/suggestions.json");
const mapsData = require("../data/mapsFull.json");

const Fuse = require("fuse.js");
const { cache } = require("../utils/cache");
const { APIError } = require("../utils/errors");
const { cacheKeys } = require("../constants.json");

const fuse = new Fuse(suggestions, { keys: ["key"] });
const suggestionsByTitle = suggestions.reduce(
  (obj, sugg) => ({ ...obj, [sugg.title]: sugg }),
  {}
);

// Fuzzy search maps by key name.
async function fuzzySearch(query) {
  // If the query is specified search for that, otherwise return a
  // random document.
  if (query) {
    return fuse.search(query);
  }

  const randIndex = Math.floor(Math.random() * (suggestions.length - 1));
  return [suggestions[randIndex]];
}

// Get a specific map by ID.
async function byID(mapID) {
  return mapsData[mapID];
}

// Get a specific map by title.
async function byTitle(title) {
  const cleanTitle = title
    .replace(/^learn anything - /, "/")
    .replace(/ - /g, "/")
    .replace(/ /g, "-");
  const { id } = suggestionsByTitle[cleanTitle] || {};

  if (id === undefined) {
    throw new APIError(404, "map not found");
  }

  const key2 = cacheKeys.maps.byID + id;
  return cache(key2, byID(id));
}

module.exports = {
  fuzzySearch,
  byID,
  byTitle
};
