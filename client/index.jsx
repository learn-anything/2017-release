import { render } from 'react-dom';
import axios from 'axios';

import App from './containers/App.jsx';
import fetchMap from './actions/fetchMap';
import store from './store/store';
import getParent from './utils/getParent';
import openNewTab from './utils/openNewTab';
import './sass/main.sass';

// Use Analytics if on production.
window.googleTrackingID = process.env.NODE_ENV === 'production' ? 'UA-74470910-2' : '';

// Enable hot reloading
if (module.hot) {
  module.hot.accept();
}

window.addEventListener('load', () => {
  render(<App store={store} />, document.getElementById('react-app'));

  // Catch clicks on links, add GA calls, and change default behavior.
  // If link is internal, fetch new map; if link is external, open in new tab.
  document.body.addEventListener('click', (e) => {
    e.preventDefault();
    const t = getParent(e.target, 'A');

    // No link
    if (!t || !t.href) {
      return;
    }

    // Internal link clicked.
    if (t.href.indexOf(window.location.origin) !== -1) {
      const url = t.href.replace(window.location.origin, '');

      ga('send', 'event', {
        eventCategory: 'Navigation',
        eventAction: 'internal link clicked',
        eventLabel: url.slice(1),
      });

      if (url.indexOf('/thank-you') !== -1 || url.indexOf('/learn-anything') !== -1) {
        setTimeout(() => { location.href = url; }, 200);
      } else {
        store.dispatch(fetchMap(url));
        ga('send', 'pageview', url);
      }
    // External link clicked.
    } else {
      openNewTab('Navigation', 'external link clicked', t.href);
    }
  });
});

window.addEventListener('popstate', () => (
  store.dispatch(fetchMap(window.location.pathname, false))
));
