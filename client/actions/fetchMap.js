import axios from 'axios';
import actions from 'constants/actions.json';

/*
 * Fetch map at given url, and update browser URL unless otherwise specified.
 */
export default id => ({
  type: actions.map.fetch.def,
  payload: axios.get(`/api/maps/${id.replace(/^\//, '')}`),
});
