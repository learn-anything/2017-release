import { cleanTitle } from 'utils/Title';
import actions from 'constants/actions.json';


const initialState = {
  title: '',
  nodes: {},
  resources: {},
  loading: false,
  error: undefined,
};

// Deep copy for nodes or resources.
const deepCopy = (obj) => {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    newObj[key] = [...obj[key]];
  });

  return newObj;
}


export default (state = initialState, action) => {
  switch (action.type) {
    case actions.map.fetch.pending:
      return {
        ...state,
        nodes: {},
        resources: {},
        loading: true,
        error: undefined,
      };

    case actions.map.fetch.fulfilled: {
      const { data } = action.payload;
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
        resources: data.resources,
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
        loading: false,
      };
    }

    case actions.map.updateResource: {
      const { nodeID, resource } = action.payload;

      // Find the node we want to modify and its index.
      const nodeResources = state.resources[nodeID];
      const oldResource = nodeResources.find(res => res.resourceID === resource.resourceID);
      const resourceIndex = nodeResources.indexOf(oldResource);

      // Copy all the resources (redux functions should be pure).
      const newResources = deepCopy(state.resources);

      // Replace old resource with the new one.
      newResources[nodeID][resourceIndex] = resource;

      return {
        ...state,
        resources: newResources,
      };
    }

    default:
      return state;
  }
};
