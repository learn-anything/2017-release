import actions from '../strings/actions.json';

export default (message, time = 3000) => (dispatch) => {
  dispatch({
    type: actions.message.hi,
    payload: message,
  });

  setTimeout(() => dispatch({ type: actions.message.show }), time);
  // setTimeout(() => dispatch({ type: actions.message.hide }), time);
  setTimeout(() => dispatch({ type: actions.message.bye }), time + 500);
};
