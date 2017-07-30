import { titleToURL, cleanTitle } from 'utils/Title';
import actions from 'constants/actions.json';


const initialState = {
  title: '',
  nodes: [],
  connections: [],
  loading: false,
  error: undefined,
};


export default (state = initialState, action) => {
  switch (action.type) {
    case actions.map.fetchUpdate.pending:
    case actions.map.fetch.pending:
      return {
        ...state,
        nodes: [],
        connections: [],
        loading: true,
        error: undefined,
      };

    case actions.map.fetchUpdate.fulfilled: {
      // Update URL on the browser
      const url = titleToURL(action.payload.data.title);
      history.pushState(null, null, url);
    }
    // Fall through next case.
    case actions.map.fetch.fulfilled: {
      const data = action.payload.data;
      const title = cleanTitle(data.title);

      // Set HTML title.
      const titleSplit = title.split(' - ');
      const topic = titleSplit[titleSplit.length - 1];
      document.title = `${topic} - Learn Anything`;

      return {
        ...state,
        title,
        loading: false,
        error: undefined,
        nodes: data.nodes,
        connections: data.connections,
      };
    }

    case actions.map.fetchUpdate.rejected:
    case actions.map.fetch.rejected: {
      // Error fetching map.
      const error = action.payload;

      return {
        ...state,
        error,
        nodes: [],
        connections: [],
        loading: false,
      };
    }

    default:
      return state;
  }
};
