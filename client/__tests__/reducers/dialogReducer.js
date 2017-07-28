import * as Dialog from '../../actions/Dialog';
import dialogReducer from '../../reducers/dialogReducer';

describe('reducers - dialogReducer', () => {
  let state;

  beforeEach(() => {
    state = dialogReducer(undefined, {});
  });


  it('should return initial state', () => {
    expect(dialogReducer(undefined, {})).toEqual({
      unmatched: {
        query: '',
        visible: false,
      },

      contribute: {
        url: '',
        visible: false,
      },
    });
  });


  it('should show unmatched dialog', () => {
    const query = 'unmatched query';
    const action = Dialog.showUnmatched(query);

    expect(dialogReducer(state, action)).toEqual({
      ...state,
      unmatched: {
        query,
        visible: true,
      },
    });
  });

  it('should hide unmatched dialog', () => {
    const customState = {
      ...state,
      unmatched: {
        query: 'this query will disappear',
        visible: true,
      },
    };
    const action = Dialog.hideUnmatched();

    expect(dialogReducer(customState, action)).toEqual(state);
  });


  it('should show contribute dialog', () => {
    const url = 'https://github.com/nikitavoloboev/learn-anything/edit/master/path/to/map';
    const action = Dialog.showContribute(url);

    expect(dialogReducer(state, action)).toEqual({
      ...state,
      contribute: {
        url,
        visible: true,
      },
    });
  });

  it('should hide contribute dialog', () => {
    const customState = {
      ...state,
      contribute: {
        url: 'https://github.com/nikitavoloboev/learn-anything/edit/master/map/that/will/disappear',
        visible: true,
      },
    };
    const action = Dialog.hideContribute();

    expect(dialogReducer(customState, action)).toEqual(state);
  });
});
