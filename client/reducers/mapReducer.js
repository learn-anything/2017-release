import { cleanTitle } from 'utils/Title';
import actions from 'constants/actions.json';

const initialState = {
  title: '',
  nodes: {},
  resources: {},
  loading: false,
  editing: false,
  mapID: undefined,
  error: undefined,

  // votes has the following structure: { resourceID: direction }
  votes: {},
  fetchedNodes: false,
  nodeSizes: {},
};

// Deep copy for nodes or resources.
const deepCopy = (obj) => {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    if (obj[key].length !== undefined) {
      newObj[key] = [...obj[key]];
    } else {
      newObj[key] = { ...obj[key] };
    }
  });

  return newObj;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.map.fetch.fulfilled: {
      const map = action.payload;
      const title = cleanTitle(map.title);

      // Set HTML title.
      const titleSplit = title.split(' - ');
      const topic = titleSplit[titleSplit.length - 1];
      document.title = `${topic} - Learn Anything`;

      return {
        ...state,
        title,
        loading: false,
        error: undefined,
        nodes: map.nodes,
        mapID: map.mapID,
        resources: map.resources,
      };
    }

    case actions.map.fetch.rejected: {
      // Error fetching map.
      const error = action.payload;

      return {
        ...state,
        error,
        nodes: {},
        resources: {},
        mapID: undefined,
        loading: false,
      };
    }

    case actions.map.nodeSizes.set: {
      const { nodeID, size } = action.payload;
      const nodeSizes = deepCopy(state.nodeSizes);
      nodeSizes[nodeID] = size;

      return {
        ...state,
        nodeSizes,
      };
    }

    default:
      return state;
  }
};
