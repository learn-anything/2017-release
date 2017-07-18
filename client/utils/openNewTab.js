export default (category, action, url) => {
  const windowRef = window.open();

  ga('send', 'event', {
    eventCategory: category,
    eventAction: action,
    eventLabel: url,
  });

  windowRef.location = url;
  windowRef.focus();
};
