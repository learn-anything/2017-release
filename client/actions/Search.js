import actions from '../strings/actions.json';

export const fetchSuggestions = query => ({
  type: actions.search.suggestions.fetch,
  payload: query,
});

export const clearSuggestions = () => ({
  type: actions.search.suggestions.clear,
});

export const updateQuery = query => ({
  type: actions.search.query.update,
  payload: query,
});

export const clearQuery = () => ({
  type: actions.search.query.clear,
});
