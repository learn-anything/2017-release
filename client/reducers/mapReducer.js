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
      const nodes = action.payload.data.nodes;
      const connections = action.payload.data.connections;

      const issueUrl = '';

      nodes.forEeach((node) => {
        console.log(node);
      });

            // Update the URL on the browser.
      const url = action.payload.config.url.replace('maps/', '');
      window.history.pushState(null, null, url);

      return {
        ...state,
        nodes,
        issueUrl,
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
