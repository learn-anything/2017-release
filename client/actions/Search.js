import axios from 'axios';
import actions from 'constants/actions.json';


let lastQueryChangeTime;
export const fetchSuggestions = (query = '') => {
  // Random suggestion
  if (query === '') {
    return {
      type: actions.search.suggestions.fetch.def,
      payload: axios.get('/api/maps/?q='),
    };
  }

  /* Suggestions for current query.
   Wait 150ms to be sure that the user stopped writing or that they're
   writing slowly, so we don't fetch useless suggestions. */
  return dispatch => setTimeout(() => {
    const currentTime = new Date();
    /* If this difference is less than 150ms it means that the query changed
     during this interval of time, and in this case we don't need to fetch
     anything. */
    if ((currentTime - lastQueryChangeTime) >= 150) {
      const cachedSuggestions = JSON.parse(localStorage.getItem('suggestions')) || {};
      const cachedResponse = cachedSuggestions[query.trim()];

      if (cachedResponse) {
        // Age of the cached response in minutes
        const cachedResponseAge = (currentTime - new Date(cachedResponse.date)) / (1000 * 60);

        // If cached suggestion is less than 6 hours old use it, otherwise fetch
        // it again.
        if (cachedResponseAge < 360) {
          dispatch({
            type: actions.search.suggestions.fetch.def,
            payload: cachedResponse.suggestions,
          });
          return;
        }
      }


      // Should check local storage first
      axios.get(`/api/maps/?q=${query}`)
        .then((result) => {
          dispatch({
            type: actions.search.suggestions.fetch.fulfilled,
            payload: result,
          });
        })
        .catch((err) => {
          dispatch({
            type: actions.search.suggestions.fetch.rejected,
            payload: err,
          });
        });

      dispatch({ type: actions.search.suggestions.fetch.pending });
    }
  }, 300);
};

export const clearSuggestions = () => ({
  type: actions.search.suggestions.clear,
});

export const updateQuery = (query) => {
  lastQueryChangeTime = new Date();

  return {
    type: actions.search.query.update,
    payload: query,
  };
};

export const clearQuery = () => ({
  type: actions.search.query.clear,
});
