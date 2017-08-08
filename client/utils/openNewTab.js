import store from 'store/store';


export default (action) => {
  // window.open doesn't actually take an argument
  // but it's useful when mocking window on tests.
  const windowRef = window.open(action.payload);
  store.dispatch(action);

  windowRef.location = action.payload;
  windowRef.focus();
};
