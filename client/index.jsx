import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from 'store/store';
import Router from 'containers/Router';
import getParent from 'utils/getParent';
import openNewTab from 'utils/openNewTab';
import actions from 'constants/actions.json';

import 'sass/main.sass';


// Enable hot reloading
if (module.hot) {
  module.hot.accept();
}

window.addEventListener('load', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>,
    document.getElementById('react-app'),
  );

  // Catch clicks on links, add GA calls, and change default behavior.
  // If link is internal, fetch new map; if link is external, open in new tab.
  const handleLinks = (e) => {
    // Get the first parent of the target element that is an A tag.
    const t = getParent(e.target, 'A');

    // No link
    if (!t || !t.href) {
      return;
    }

    // External link clicked.
    if (!t.href.includes(window.location.origin)) {
      e.preventDefault();
      openNewTab({
        type: actions.ga.navigation.external,
        payload: t.href,
      });
    } else {
      e.preventDefault();
      const relativePath = t.href.replace(window.location.origin, '');
      window.laAuth.history.push(relativePath);
      store.dispatch({
        type: actions.ga.navigation.internal,
        payload: relativePath,
      });
    }
  };

  document.body.addEventListener('click', handleLinks);
  document.body.addEventListener('touchend', handleLinks);
});
