import actions from 'constants/actions.json';

export const showDialog = content => ({
  type: actions.dialog.show,
  payload: content,
});

export const hideDialog = () => ({
  type: actions.dialog.hide,
});
