import axios from 'axios';
import actions from 'constants/actions.json';

/*
 * Fetch map at given url, and update browser URL unless otherwise specified.
 */
export const fetchMap = id => ({
  type: actions.map.fetch.def,
  payload: axios.get(`/api/maps/${id.replace(/^\//, '')}`),
});

// size is { height, width }
export const setNodeSize = (nodeID, size) => ({
  type: actions.map.nodeSizes.set,
  payload: { nodeID, size },
});
