import actions from 'constants/actions.json';


const initialState = {
  isVisible: false,
  content: '',
  isJsx: false,
  closeButton: true,
};


export default (state = initialState, action) => {
  switch (action.type) {
    case actions.dialog.show: {
      const { content, isJsx, closeButton, overlayDismiss } = action.payload;

      return {
        content,
        isJsx,
        closeButton,
        overlayDismiss,
        isVisible: true,
      };
    }

    case actions.map.createResource.fulfilled:
    case actions.dialog.hide:
      return {
        content: '',
        isVisible: false,
      };

    default:
      return state;
  }
};
