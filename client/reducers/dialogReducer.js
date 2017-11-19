import actions from 'constants/actions.json';


const initialState = {
  isVisible: false,
  content: '',
  isJsx: false,
};


export default (state = initialState, action) => {
  switch (action.type) {
    case actions.dialog.show: {
      const { content, isJsx } = action.payload;

      return {
        content,
        isJsx,
        isVisible: true,
      };
    }

    case actions.dialog.hide:
      return {
        content: '',
        isVisible: false,
      };

    default:
      return state;
  }
};
