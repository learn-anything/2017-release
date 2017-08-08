import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from 'containers/App';
import fetchMap from 'actions/fetchMap';
import store from 'store/store';
import getParent from 'utils/getParent';
import openNewTab from 'utils/openNewTab';
import actions from 'constants/actions.json';

import 'sass/main.sass';
import 'themes/_PearlWhite.sass';
import 'themes/_Night.sass';


// Use Analytics if on production.
window.googleTrackingID = process.env.NODE_ENV === 'production' ? 'UA-74470910-2' : '';

// Enable hot reloading
if (module.hot) {
  module.hot.accept();
}


window.addEventListener('load', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('react-app'),
  );

  // Catch clicks on links, add GA calls, and change default behavior.
  // If link is internal, fetch new map; if link is external, open in new tab.
  document.body.addEventListener('click', (e) => {
    e.preventDefault();
    // Get the first parent of the target element that is an A tag.
    const t = getParent(e.target, 'A');

    // No link
    if (!t || !t.href) {
      return;
    }

    // Internal link clicked.
    if (t.href.includes(window.location.origin)) {
      const url = t.href.replace(window.location.origin, '');

      store.dispatch({
        type: actions.ga.navigation.internal,
        payload: url.slice(1),
      });

      if (url.includes('/thank-you') || url.includes('/learn-anything')) {
        setTimeout(() => { location.href = url; }, 200);
      } else {
        store.dispatch(fetchMap(url));
      }

    //  External link clicked.
    } else {
      openNewTab({
        type: actions.ga.navigation.external,
        payload: t.href,
      });
    }
  });
});

window.addEventListener('popstate', () => (
  store.dispatch(fetchMap(window.location.pathname, false))
));
