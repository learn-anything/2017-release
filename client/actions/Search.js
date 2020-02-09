import actions from 'constants/actions.json';
import Fuse from 'fuse.js';

const fuse = new Fuse(window.LASuggestions, { keys: ['key'] });

export const fetchSuggestions = (query = '') => {
  const suggestions = window.LASuggestions;

  // Random suggestion
  if (query === '') {
    const randIndex = Math.floor(Math.random() * (suggestions.length - 1));

    return {
      type: actions.search.suggestions.fetch.fulfilled,
      payload: {
        isRandom: true,
        suggestions: [suggestions[randIndex]],
      },
    };
  }

  return {
    type: actions.search.suggestions.fetch.fulfilled,
    payload: {
      isRandom: false,
      suggestions: fuse.search(query).slice(0, 10),
    },
  };
};

export const clearSuggestions = () => ({
  type: actions.search.suggestions.clear,
});

export const updateQuery = (query) => ({
  type: actions.search.query.update,
  payload: query,
});

export const clearQuery = () => ({
  type: actions.search.query.clear,
});
