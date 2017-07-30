import * as Search from 'actions/Search';
import { search } from 'constants/actions.json';

describe('actions - Search', () => {
  it('should create action to show fetch suggestions', () => {
    const query = 'sugg';

    const expectedAction = {
      type: search.suggestions.fetch.def,
      payload: new Promise(() => {}),
    };

    expect(Search.fetchSuggestions(query)).toEqual(expectedAction);
  });

  it('should create action to clear suggestions', () => {
    const expectedAction = { type: search.suggestions.clear };
    expect(Search.clearSuggestions()).toEqual(expectedAction);
  });

  it('should create action to update query', () => {
    const query = 'https://github.com/nikitavoloboev/learn-anything/edit/master/path/to/map';
    const expectedAction = {
      type: search.query.update,
      payload: query,
    };

    expect(Search.updateQuery(query)).toEqual(expectedAction);
  });

  it('should create action to clear query', () => {
    const expectedAction = { type: search.query.clear };
    expect(Search.clearQuery()).toEqual(expectedAction);
  });
});
