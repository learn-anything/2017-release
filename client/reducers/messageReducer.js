import actions from '../strings/actions.json';

export default (state = {}, action) => {
  switch (action.type) {
    case actions.message.show:
      return {
        ...state,
        visible: 'visible',
      };

    case actions.message.hide:
      return {
        ...state,
        visible: 'invisible',
      };
    case actions.message.bye:
      return {
        ...state,
        visible: 'hidden',
      };
    case actions.message.hi:
      return {
        ...state,
        visible: 'show',
        text: action.payload,
      };
    default:
      return state;
  }
};
