import { combineReducers } from 'redux';

import searchReducer from './searchReducer';
import dialogReducer from './dialogReducer';
import mapReducer from './mapReducer';


// Bundled reducers used by store/store.js.
export default combineReducers({
  search: searchReducer,
  dialog: dialogReducer,
  map: mapReducer,
});
