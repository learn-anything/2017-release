import { combineReducers } from 'redux';

import messageReducer from './messageReducer';
import searchReducer from './searchReducer';
import mapReducer from './mapReducer';
import currentUrlReducer from './currentUrlReducer';

// Here are all the bundled reducers, and these are used by store/store.js.
export default combineReducers({
  message: messageReducer,
  search: searchReducer,
  map: mapReducer,
  currentUrl: currentUrlReducer,
});
