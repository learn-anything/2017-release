import axios from 'axios';

import actions from '../strings/actions.json';

export default path => ({
  type: actions.map.fetch.def,
  payload: axios.get(`maps/${path}`),
});
