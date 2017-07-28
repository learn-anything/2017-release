import actions from '../strings/actions.json';

export const showUnmatched = query => ({
  type: actions.dialogs.unmatched.show,
  payload: query,
});

export const hideUnmatched = () => ({
  type: actions.dialogs.unmatched.hide,
});

export const showContribute = url => ({
  type: actions.dialogs.contribute.show,
  payload: url,
});

export const hideContribute = () => ({
  type: actions.dialogs.contribute.hide,
});
