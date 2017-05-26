import actions from '../strings/actions.json';

export default (state = {}, action) => {
  switch (action.type) {
    case actions.message.show:
      return {
        ...state,
        visible: true,
        text: action.payload,
      };

    case actions.message.hide:
      return {
        ...state,
        visible: false,
      };

    default:
      return state;
  }
};
