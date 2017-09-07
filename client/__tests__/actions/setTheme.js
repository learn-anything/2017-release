import setTheme from 'actions/setTheme';
import { theme } from 'constants/actions.json';

describe('actions - setTheme', () => {
  it('should create action to set theme', () => {
    const themeName = 'my-fancy-theme';
    const expectedAction = {
      type: theme.set,
      payload: themeName,
    };

    expect(setTheme(themeName)).toEqual(expectedAction);
  });
});
