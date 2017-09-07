import * as Search from 'actions/Search';
import searchReducer from 'reducers/searchReducer';
import { search } from 'constants/actions.json';

describe('reducers - searchReducer', () => {
  let state;

  beforeEach(() => {
    state = searchReducer(undefined, {});
  });


  it('should return initial state', () => {
    expect(searchReducer(undefined, {})).toEqual({
      query: '',
      suggestions: [],
      placeholder: { key: '', id: '' },
    });
  });


  it('should update query', () => {
    const query = 'updated query';
    const action = Search.updateQuery(query);

    expect(searchReducer(state, action)).toEqual({ ...state, query });
  });

  it('should clear query', () => {
    const customState = {
      ...state,
      query: 'this query will be cleared'
    };

    const action = Search.clearQuery();

    expect(searchReducer(customState, action)).toEqual(state);
  });


  it('should fetch suggestions', () => {
    const suggestions = [
      { key: 'suggestion that', id: 1 },
      { key: 'will be returned', id: 2 },
    ];

    const action = {
      type: search.suggestions.fetch.fulfilled,
      payload: {
        data: suggestions,
        config: {
          url: '/api/maps/?q=query',
        },
      },
    };

    expect(searchReducer(state, action)).toEqual({ ...state, suggestions });
  });

  it('should fetch placeholder', () => {
    const placeholder = { key: 'placeholder', id: 1 };

    const action = {
      type: search.suggestions.fetch.fulfilled,
      payload: {
        data: [placeholder],
        config: {
          url: '/api/maps/?q=',
        },
      },
    };

    expect(searchReducer(state, action)).toEqual({ ...state, placeholder });
  });

  it('should clear suggestions', () => {
    const customState = {
      ...state,
      suggestions: [
        { key: 'suggestion that', id: 1 },
        { key: 'will be deleted', id: 2 },
      ],
    };

    const action = Search.clearSuggestions();

    expect(searchReducer(customState, action)).toEqual(state);
  });
});
