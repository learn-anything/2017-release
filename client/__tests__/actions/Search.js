import * as Search from 'actions/Search';
import { search } from 'constants/actions.json';

describe('actions - Search', () => {
  it('should create action to get random suggestion', () => {
    const query = '';

    const expectedAction = {
      type: search.suggestions.fetch.def,
      payload: new Promise(() => {}),
    };

    expect(Search.fetchSuggestions(query)).toEqual(expectedAction);
  });

  it('should create action to get random suggestion', () => {
    const query = '';

    const expectedAction = {
      type: search.suggestions.fetch.def,
      payload: new Promise(() => {}),
    };

    expect(Search.fetchSuggestions(query)).toEqual(expectedAction);
  });

  it('should create action to fetch suggestions', () => {
    const query = 'a query';
    const dispatch = jest.fn();

    const action = Search.fetchSuggestions(query);
    expect(typeof action).toEqual('function');

    action(dispatch);
    setTimeout(() => {
      expect(dispatch.mock.calls.length).toBe(1);
      expect(dispatch.mock.calls[0][0]).toBe({ type: actions.search.suggestions.fetch.pending });
    }, 300);
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
