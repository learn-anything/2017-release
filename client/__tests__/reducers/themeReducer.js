import setTheme from 'actions/setTheme';
import themeReducer from 'reducers/themeReducer';

describe('reducers - themeReducer', () => {
  let state;

  beforeEach(() => {
    state = themeReducer(undefined, {});
  });


  it('should return initial state', () => {
    expect(themeReducer(undefined, {})).toEqual('PearlWhite');
  });


  it('should change state to specified theme and add it to local storage', () => {
    const theme = 'my-fancy-theme';
    const action = setTheme(theme);

    expect(themeReducer(state, action)).toEqual(theme);
    expect(localStorage.getItem('theme')).toEqual(theme);
  });
});
