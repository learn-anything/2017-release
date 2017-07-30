import actions from 'constants/actions.json';


const initialState = {
  query: '',
  suggestions: [],
  placeholder: { key: '', id: '' },
};


export default (state = initialState, action) => {
  switch (action.type) {
    case actions.search.suggestions.fetch.fulfilled:
      // If no query was passed to the API, it means that a random
      // map was requested for the placeholder.
      if (action.payload.config.url.endsWith('/api/maps/?q=')) {
        return {
          ...state,
          placeholder: action.payload.data[0],
        };
      }

      return {
        ...state,
        suggestions: action.payload.data,
      };

    case actions.search.suggestions.clear:
      return {
        ...state,
        suggestions: [],
      };

    case actions.search.query.update:
      return {
        ...state,
        query: action.payload,
      };

    case actions.search.query.clear:
      return {
        ...state,
        query: '',
      };

    default:
      return state;
  }
};
