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

const App = ({ location }) => {
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
    const isLinkOrImage = e.target.tagName === 'A' || e.target.tagName === 'IMG';
    const href = e.target.href;
    console.log(href);

    if (isLinkOrImage && href.match(/.*\/id\/\S{40}/)) {
      e.preventDefault();

      const id = href.replace(/^.*\/id\/(.{40}).*/, '$1');
      console.log(id);
      axios.get(`/maps-lookup/${id}`)
        .then(res => store.dispatch(fetchMap(res.data.title)));
    }
  };
};
