import actions from '../strings/actions.json';

export default selected => ({
  type: actions.menu.set,
  payload: selected,
});
