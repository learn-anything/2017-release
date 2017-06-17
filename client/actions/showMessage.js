import actions from '../strings/actions.json';

export default (message, time = 2000) => (dispatch) => {
  const animTime = 250;

  dispatch({
    type: actions.message.hi,
    payload: message,
  });
  // Makes the Snack bar move up
  setTimeout(() => dispatch({ type: actions.message.show }), animTime);
  // Makes the Snack bar move back down
  setTimeout(() => dispatch({ type: actions.message.hide }), animTime + time);
  // Makes the Snack bar disappear
  setTimeout(() => dispatch({ type: actions.message.bye }), (2 * animTime) + time);
};
