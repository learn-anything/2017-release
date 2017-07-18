import actions from '../strings/actions.json';

export default (state = {}, action) => {
  switch (action.type) {
    case actions.dialogs.unmatched.show:
      return {
        ...state,
        unmatched: {
          visible: true,
          query: action.payload,
        },
      };

    case actions.dialogs.unmatched.hide:
      return {
        ...state,
        unmatched: {
          visible: false,
          query: '',
        },
      };

    case actions.dialogs.contribute.show:
      return {
        ...state,
        contribute: {
          visible: true,
          url: action.payload,
        },
      };

    case actions.dialogs.contribute.hide:
      return {
        ...state,
        contribute: {
          visible: false,
          url: '',
        },
      };

    default:
      return state;
  }
};
