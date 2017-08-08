import { applyMiddleware, createStore, compose } from 'redux';

// Redux middleware that allows to pass functions to dispatch methods.
import thunk from 'redux-thunk';

// Redux middleware that allows to pass promises within the dispatch object.
import promise from 'redux-promise-middleware';
import reducer from 'reducers/index';
import gaMiddleware from './gaMiddleware';

// Used for Redux devtools.
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = applyMiddleware(promise(), thunk, gaMiddleware);


export default createStore(reducer, {}, composeEnhancers(middleware));
