import axios from 'axios';
import actions from '../strings/actions.json';

/*
 * Fetch map at given url, and update browser URL unless otherwise specified.
 */
export default (url, updateURL = true) => {
  let apiURL;

  if (!url.startsWith('/')) {
    apiURL = `/maps/${url}`;
  } else {
    apiURL = `/maps${url}`;
  }

  return {
    type: updateURL ? actions.map.fetchUpdate.def : actions.map.fetch.def,
    payload: axios.get(apiURL),
  };
};
