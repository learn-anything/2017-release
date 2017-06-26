import axios from 'axios';
import actions from '../strings/actions.json';

/*
 * Fetch map at given url, and update browser URL unless otherwise specified.
 */
export default (url, updateURL = true) => {
  if (updateURL) {
    return {
      type: actions.map.fetchUpdate.def,
      payload: axios.get(`/maps${url}`),
    };
  }

  return {
    type: actions.map.fetch.def,
    payload: axios.get(`/maps${url}`),
  };
};
