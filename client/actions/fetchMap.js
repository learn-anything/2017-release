import axios from 'axios';
import actions from 'constants/actions.json';

/*
 * Fetch map at given url, and update browser URL unless otherwise specified.
 */
export default (id, updateURL = true) => {
  const apiURL = `/api/maps/${id.replace(/^\//, '')}`;
  let type = actions.map.fetch.def;

  if (updateURL) {
    type = actions.map.fetchUpdate.def;
  }

  return {
    type,
    payload: axios.get(apiURL),
  };
};
