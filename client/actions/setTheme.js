import actions from '../strings/actions.json';

export default theme => ({
  type: actions.theme.set,
  payload: theme,
});
