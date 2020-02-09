export default (url) => {
  // window.open doesn't actually take an argument
  // but it's useful when mocking window on tests.
  const windowRef = window.open(url);

  windowRef.location = url;
  windowRef.focus();
};
