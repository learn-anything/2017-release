import { applyMiddleware, createStore } from 'redux';

// Redux middleware that logs actions and state changes.
// import { createLogger } from 'redux-logger';

// Redux middleware that allows to pass functions to dispatch methods.
import thunk from 'redux-thunk';

// Redux middleware that allows to pass promises within the dispatch object.
import promise from 'redux-promise-middleware';

import reducer from '../reducers/index';

// const middleware = applyMiddleware(promise(), thunk, createLogger());
const middleware = applyMiddleware(promise(), thunk);
const initialState = {
  map: {
    nodes: [],
    connections: [],
    loading: false,
    fetched: false,
    exploring: false,
    error: undefined,
  },

  message: {
    text: '',
    visible: false,
  },

  search: {
    query: '',
    suggestions: [],
  },

  currentUrl: {
    currentUrl: '',
  },

};

export default createStore(reducer, initialState, middleware);
