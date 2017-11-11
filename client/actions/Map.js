import axios from 'axios';
import actions from 'constants/actions.json';


const headers = {
  Authorization: `Bearer ${localStorage.getItem('access_token')}`,
};

/*
 * Fetch map at given url, and update browser URL unless otherwise specified.
 */
export const fetchMap = (id) => {
  const getMap = axios.get(`/api/maps/${id.replace(/^\//, '')}`);
  const getVotes = axios.get(
    `/api/votes/?mapID=${id.replace(/^\//, '')}`,
    { headers },
  ).catch((err) => {
    console.warn(err);
    return [];
  });

  return {
    type: actions.map.fetch.def,
    payload: Promise.all([getMap, getVotes]),
  };
};


export const updateResource = (nodeID, resource, direction) => ({
  type: actions.map.updateResource,
  payload: { nodeID, resource, direction },
});
