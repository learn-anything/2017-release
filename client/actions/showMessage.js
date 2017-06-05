import actions from '../strings/actions.json';

export default (message, time = 3000) => (dispatch) => {
  dispatch({
    type: actions.message.show,
    payload: message,
  });

  setTimeout(() => dispatch({ type: actions.message.hide }), time);
};
