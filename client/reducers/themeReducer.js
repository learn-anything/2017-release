import actions from '../strings/actions.json';

export default (state = 'PearlWhite', action) => {
  switch (action.type) {
    case actions.theme.set:
      localStorage.setItem('theme', action.payload);
      return action.payload;

    default:
      return state;
  }
};
