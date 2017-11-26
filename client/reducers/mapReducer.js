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
      const map = action.payload.data;
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

    case actions.map.voteResource.fulfilled: {
      const { resource, vote } = action.payload.data;

      // Find the node we want to modify and its index.
      const nodeResources = state.resources[resource.parentID];
      const oldResource = nodeResources.find(res => res.resourceID === resource.resourceID);
      const resourceIndex = nodeResources.indexOf(oldResource);

      // Copy all the resources (redux functions should be pure).
      const newResources = deepCopy(state.resources);

      // Replace old resource with the new one.
      newResources[resource.parentID][resourceIndex] = resource;

      const votes = { ...state.votes };
      votes[vote.resourceID] = vote.direction;

      return {
        ...state,
        votes,
        resources: newResources,
      };
    }

    case actions.map.createResource.fulfilled: {
      const resource = action.payload.data;

      // Copy all the resources (redux functions should be pure).
      const newResources = deepCopy(state.resources);
      newResources[resource.parentID].push(resource);

      return {
        ...state,
        resources: newResources,
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

    case actions.map.toggleEditing:
      return {
        ...state,
        editing: !state.editing,
      };

    case actions.map.clearVotes:
      return {
        ...state,
        votes: {},
        fetchedNodes: false,
      };

    case actions.map.fetchVotes.fulfilled: {
      const votes = action.payload.data || [];
      const convertedVotes = {};

      votes.forEach(({ resourceID, direction }) => {
        convertedVotes[resourceID] = direction;
      });

      return {
        ...state,
        votes: convertedVotes,
        fetchedNodes: true,
      };
    }

    default:
      return state;
  }
};
