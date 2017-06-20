import actions from '../strings/actions.json';

export default (state = {}, action) => {
  switch (action.type) {
    case actions.map.fetch.pending:
      return {
        ...state,
        nodes: [],
        connections: [],
        loading: true,
        fetched: false,
        error: undefined,
      };

    case actions.map.fetch.fulfilled: {
      const connections = action.payload.data.connections;
      const subnodes = action.payload.data.subnodes;
      const nodes = action.payload.data.nodes;

      // Update the URL on the browser.
      const url = action.payload.config.url.replace('maps/', '');
      const path = url.replace(window.location.origin, '').replace('/', '');
      window.history.pushState(path, null, url);

      // Set HTML title for some very minor UX boost.
      // Not the best for SEO purposes, but the fact that there's more pages is an illusion, anyway
      const urlSpl = url.split('/');
      const topic = urlSpl[urlSpl.length - 1];
      document.title = topic.replace('-', ' ').concat(' - Learn Anything');

      return {
        ...state,
        nodes,
        subnodes,
        connections,
        loading: false,
        fetched: true,
        exploring: true,
        error: undefined,
      };
    }

    case actions.map.fetch.rejected: {
      const error = action.payload;

      return {
        ...state,
        error,
        nodes: [],
        connections: [],
        loading: false,
        fetched: false,
      };
    }

    default:
      return state;
  }
};
