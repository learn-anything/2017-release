import axios from 'axios';
import { showDialog } from 'actions/Dialog';
import actions from 'constants/actions.json';


/*
 * Fetch map at given url, and update browser URL unless otherwise specified.
 */
export const fetchMap = id => ({
  type: actions.map.fetch.def,
  payload: axios.get(`/api/maps/${id.replace(/^\//, '')}`),
});

export const clearVotes = () => ({
  type: actions.map.clearVotes,
});

export const fetchVotes = mapID => ({
  type: actions.map.fetchVotes.def,
  payload: axios.get(`/api/votes/?mapID=${mapID}`, { headers: window.laAuth.getAuthorizationHeader() }),
});

export const voteResource = (resourceID, direction) => {
  if (!window.laAuth.isAuthenticated()) {
    return showDialog(__('unauthorized_dialog'));
  }

  return {
    type: actions.map.voteResource.def,
    payload: axios.post(
      '/api/votes',
      { resourceID, direction },
      { headers: window.laAuth.getAuthorizationHeader() },
    ),
  };
};

// size is { height, width }
export const setNodeSize = (nodeID, size) => ({
  type: actions.map.nodeSizes.set,
  payload: { nodeID, size },
});
