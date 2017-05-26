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
    store.dispatch(fetchMap(location.pathname));
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

    if (isLinkOrImage && href.indexOf('https://my.mindnode.com/') !== -1) {
      e.preventDefault();

      const id = href.replace(/^.*mindnode.com\/(.{40}).*/, '$1');
      axios.get(`/maps-lookup/${id}`)
        .then(res => store.dispatch(fetchMap(res.data.title)));
    }
  };
};
