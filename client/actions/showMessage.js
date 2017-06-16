import actions from '../strings/actions.json';

export default (message, time = 500) => (dispatch) => {
  dispatch({
    type: actions.message.hi,
    payload: message,
  });
  // Makes the Snack bar move up
  setTimeout(() => dispatch({ type: actions.message.show }), time);
  // Makes the Snack bar move back down
  setTimeout(() => dispatch({ type: actions.message.hide }), time + 2000);
  // Makes the Snack bar disappear
  setTimeout(() => dispatch({ type: actions.message.bye }), time + 3000);
};
