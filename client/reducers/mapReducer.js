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
      const pattern = /https:\/\/github\.com\/nikitavoloboev\/[^/]*\/issues\/(\d*)/;
      const connections = action.payload.data.connections;
      const nodes = action.payload.data.nodes;

      let issueUrl = '';

      // Find link to map issue
      nodes.forEach((node) => {
        if (node.note) {
          const match = node.note.text.match(pattern);

          if (match) {
            issueUrl = match[0];
          }
        }
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
