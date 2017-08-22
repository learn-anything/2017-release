import actions from 'constants/actions.json';


const initialState = {
  query: '',
  suggestions: [],
  placeholder: { key: '', id: '' },
};


export default (state = initialState, action) => {
  switch (action.type) {
    case actions.search.suggestions.fetch.def: {
      return {
        ...state,
        suggestions: action.payload,
      };
    }


    case actions.search.suggestions.fetch.fulfilled: {
      const query = action.payload.config.url.replace('/api/maps/?q=', '');
      const suggestions = action.payload.data;

      // If no query was passed to the API, it means that a random
      // map was requested for the placeholder.
      if (query === '') {
        return {
          ...state,
          placeholder: suggestions[0],
        };
      }

      const cachedSuggestions = JSON.parse(localStorage.getItem('suggestions')) || {};
      cachedSuggestions[query.trim()] = {
        date: new Date(),
        suggestions,
      };
      localStorage.setItem('suggestions', JSON.stringify(cachedSuggestions));

      return {
        ...state,
        suggestions,
      };
    }


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
