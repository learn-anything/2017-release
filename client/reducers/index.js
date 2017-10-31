import { combineReducers } from 'redux';

import searchReducer from './searchReducer';
import dialogReducer from './dialogReducer';
import legendReducer from './legendReducer';
import mapReducer from './mapReducer';


// Bundled reducers used by store/store.js.
export default combineReducers({
  search: searchReducer,
  dialog: dialogReducer,
  legend: legendReducer,
  map: mapReducer,
});
