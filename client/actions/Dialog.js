import actions from 'constants/actions.json';


export const showDialog = (content, isJsx = false) => ({
  type: actions.dialog.show,
  payload: { content, isJsx },
});

export const hideDialog = () => ({
  type: actions.dialog.hide,
});
