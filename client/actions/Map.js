import actions from 'constants/actions.json';

const suggestionsByTitle = window.LASuggestions.reduce(
  (obj, sugg) => ({ ...obj, [sugg.title]: sugg }),
  {},
);

const mapByID = (id) => window.LAMaps[id];

/*
 * Fetch map at given url, and update browser URL unless otherwise specified.
 */
export const fetchMap = (id) => {
  // ID: /100
  const cleanID = id.replace(/^\//, '');
  if (mapByID(cleanID)) {
    return {
      type: actions.map.fetch.fulfilled,
      payload: mapByID(cleanID),
    };
  }

  // ID: /biology/genetics/genetic-engineering/gmo
  const cleanTitle = id
    .replace(/^learn anything - /, '/')
    .replace(/ - /g, '/')
    .replace(/ /g, '-');
  const { id: idFromTitle } = suggestionsByTitle[cleanTitle] || {};

  if (mapByID(idFromTitle)) {
    return {
      type: actions.map.fetch.fulfilled,
      payload: mapByID(idFromTitle),
    };
  }

  // ID: map not found
  return {
    type: actions.map.fetch.rejected,
    payload: { error: `map "${id}" not found` },
  };
};

// size is { height, width }
export const setNodeSize = (nodeID, size) => ({
  type: actions.map.nodeSizes.set,
  payload: { nodeID, size },
});
