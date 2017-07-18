import { combineReducers } from 'redux';

import dialogReducer from './dialogReducer';
import searchReducer from './searchReducer';
import mapReducer from './mapReducer';
import themeReducer from './themeReducer';

// Here are all the bundled reducers, and these are used by store/store.js.
export default combineReducers({
  dialogs: dialogReducer,
  search: searchReducer,
  map: mapReducer,
  theme: themeReducer,
});
