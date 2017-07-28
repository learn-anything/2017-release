import { combineReducers } from 'redux';

import dialogReducer from './dialogReducer';
import searchReducer from './searchReducer';
import mapReducer from './mapReducer';
import themeReducer from './themeReducer';

// Bundled reducers used by store/store.js.
export default combineReducers({
  dialogs: dialogReducer,
  search: searchReducer,
  map: mapReducer,
  theme: themeReducer,
});
