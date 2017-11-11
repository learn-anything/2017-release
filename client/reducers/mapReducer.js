import { cleanTitle } from 'utils/Title';
import actions from 'constants/actions.json';


const initialState = {
  title: '',
  nodes: {},
  resources: {},
  loading: false,
  mapID: undefined,
  error: undefined,
  votes: [],
};

// Deep copy for nodes or resources.
const deepCopy = (obj) => {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    newObj[key] = [...obj[key]];
  });

  return newObj;
};


export default (state = initialState, action) => {
  switch (action.type) {
    case actions.map.fetch.pending:
      return {
        ...state,
        nodes: {},
        resources: {},
        loading: true,
        mapID: undefined,
        error: undefined,
      };

    case actions.map.fetch.fulfilled: {
      let [map, votes] = action.payload;
      console.log(action.payload);
      map = map.data;
      votes = votes.data;
      const title = cleanTitle(map.title);

      // Set HTML title.
      const titleSplit = title.split(' - ');
      const topic = titleSplit[titleSplit.length - 1];
      document.title = `${topic} - Learn Anything`;

      return {
        ...state,
        title,
        votes,
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

    case actions.map.updateResource: {
      const { nodeID, resource, direction } = action.payload;

      // Find the node we want to modify and its index.
      const nodeResources = state.resources[nodeID];
      const oldResource = nodeResources.find(res => res.resourceID === resource.resourceID);
      const resourceIndex = nodeResources.indexOf(oldResource);

      // Copy all the resources (redux functions should be pure).
      const newResources = deepCopy(state.resources);

      // Replace old resource with the new one.
      newResources[nodeID][resourceIndex] = resource;

      // "deep" copy votes.
      const votes = state.votes.map(vote => ({ ...vote }));
      // Find the vote that was modified.
      const vote = votes.find(v => v.resourceID === resource.resourceID);
      if (vote) {
        vote.direction = direction;
      }

      return {
        ...state,
        votes,
        resources: newResources,
      };
    }

    default:
      return state;
  }
};
