import actions from 'constants/actions.json';


const initialState = {
  isVisible: false,
  content: '',
};


export default (state = initialState, action) => {
  switch (action.type) {
    case actions.dialog.show:
      return {
        isVisible: true,
        content: action.payload,
      };

    case actions.dialog.hide:
      return {
        content: '',
        isVisible: false,
      };

    default:
      return state;
  }
};
