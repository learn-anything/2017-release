import axios from 'axios';
import { showDialog } from 'actions/Dialog';
import actions from 'constants/actions.json';


/*
 * Fetch map at given url, and update browser URL unless otherwise specified.
 */
export const fetchMap = (id) => {
  const getMap = axios.get(`/api/maps/${id.replace(/^\//, '')}`);
  const getVotes = axios.get(
    `/api/votes/?mapID=${id.replace(/^\//, '')}`,
    { headers: { Authorization: window.laAuth.getAuthorizationHeader() } },
  ).catch((err) => {
    console.warn(err);
    return [];
  });

  return {
    type: actions.map.fetch.def,
    payload: Promise.all([getMap, getVotes]),
  };
};


export const voteResource = (resourceID, direction) => {
  if (!window.laAuth.isAuthenticated()) {
    return showDialog(__('unauthorized_dialog'));
  }

  return {
    type: actions.map.voteResource.def,
    payload: axios.post(
      '/api/votes',
      { resourceID, direction },
      { headers: { Authorization: window.laAuth.getAuthorizationHeader() } },
    ),
  };
};
