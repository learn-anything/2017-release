import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import SearchBar from './containers/SearchBar.jsx';
import MindMapWrapper from './components/MindMapWrapper.jsx';
import SnackBar from './components/SnackBar.jsx';
import fetchMap from './actions/fetchMap';
import store from './store/store';
import './sass/main.sass';

// Use Analytics if on production.
window.googleTrackingID = process.env.NODE_ENV === 'production' ? 'UA-74470910-2' : '';

const App = ({ location }) => {
  ga('send', 'pageview', location.pathname);

  if (location.pathname !== '/') {
    store.dispatch(fetchMap(location.pathname.slice(1)));
  }

  return (
    <div>
      <SearchBar />
      <MindMapWrapper />
      <SnackBar />
    </div>
  );
};

window.onload = () => {
  render(
    <Provider store={store}>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </Provider>,
    document.getElementById('react-app'),
  );

  document.body.onclick = (e) => {
    let t = e.target;

    if (t.tagName === 'IMG' && t.parentElement.tagName === 'A') {
      t = t.parentElement;
    }

    if (t.tagName === 'A' && t.href.match(/.*\/id\/\S{40}/)) {
      e.preventDefault();

      const id = t.href.replace(/^.*\/id\/(.{40}).*/, '$1');
      axios.get(`/maps-lookup/${id}`)
        .then((res) => {
          ga('send', 'event', {
            eventCategory: 'Navigation',
            eventAction: 'internal link clicked',
            eventLabel: res.data.title,
          });

          store.dispatch(fetchMap(res.data.title));
          ga('send', 'pageview', `/${res.data.title}`);
        });
    } else if (t.tagName === 'A') {
      e.preventDefault();

      setTimeout(() => { location.href = t.href; }, 500);

      ga('send', 'event', {
        eventCategory: 'Navigation',
        eventAction: 'external link clicked',
        eventLabel: t.href,
        hitCallback: () => { location.href = t.href; },
      });
    }
  };
};
