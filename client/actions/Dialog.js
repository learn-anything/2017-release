import actions from 'constants/actions.json';


/*
Options is an object containing options that will be passed down to the dialog.
Available options are the following.
  - isJsx (boolean): the content is not a string with html, but it's a JSX component.
  - closeButton (boolean): whether or not we want to show the close button on the top right.
  - overlayDismiss (boolean): whether or not the dialog is dismissed when clicking outside of it.
*/
export const showDialog = (content, options = {}) => ({
  type: actions.dialog.show,
  payload: {
    content,
    isJsx: options.isJsx,
    closeButton: options.closeButton === undefined ? true : options.closeButton,
    overlayDismiss: options.overlayDismiss === undefined ? true : options.overlayDismiss,
  },
});

export const hideDialog = () => ({
  type: actions.dialog.hide,
});
