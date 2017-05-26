import actions from '../strings/actions.json';
import { getSuggestions } from '../utils/autocomplete';

export default (state = {}, action) => {
  switch (action.type) {
    case actions.search.suggestions.fetch:
    case actions.search.query.update:
      if (typeof action.payload !== 'string') {
        return state;
      }

      return {
        ...state,
        query: action.payload,
        suggestions: getSuggestions(action.payload),
      };

    case actions.search.suggestions.clear:
      return {
        ...state,
        suggestions: [],
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
