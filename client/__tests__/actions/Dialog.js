import * as Dialog from '../../actions/Dialog';
import { dialogs } from '../../strings/actions.json';

describe('actions - Dialog', () => {
  it('should create action to show unmatched dialog', () => {
    const query = 'this is an unmatched query';
    const expectedAction = {
      type: dialogs.unmatched.show,
      payload: query,
    };

    expect(Dialog.showUnmatched(query)).toEqual(expectedAction);
  });

  it('should create action to hide unmatched dialog', () => {
    const expectedAction = { type: dialogs.unmatched.hide };
    expect(Dialog.hideUnmatched()).toEqual(expectedAction);
  });

  it('should create action to show contribute dialog', () => {
    const url = 'https://github.com/nikitavoloboev/learn-anything/edit/master/path/to/map';
    const expectedAction = {
      type: dialogs.contribute.show,
      payload: url,
    };

    expect(Dialog.showContribute(url)).toEqual(expectedAction);
  });

  it('should create action to hide contribute dialog', () => {
    const expectedAction = { type: dialogs.contribute.hide };
    expect(Dialog.hideContribute()).toEqual(expectedAction);
  });
});
