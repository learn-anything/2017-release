import actions from 'constants/actions.json';

export default theme => ({
  type: actions.theme.set,
  payload: theme,
});
