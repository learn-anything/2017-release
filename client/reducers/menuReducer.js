import actions from '../strings/actions.json';

export default (state = {}, action) => {
  switch (action.type) {
    case actions.menu.set:
      return {
        ...state,
        selected: action.payload,
      };
    default:
      return state;
  }
};
