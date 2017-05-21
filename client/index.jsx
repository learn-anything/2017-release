import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MindMap from 'react-mindmap';

import SearchBar from './components/SearchBar.jsx';
import SnackBar from './components/SnackBar.jsx';
import Observable from './utils/Observable';
import getJSON from './utils/getJSON';
import './sass/main.sass';

const message = new Observable('');
const url = new Observable(null);

const Root = () => (
  <div>
    <SearchBar message={message} url={url} />
    <SnackBar message={message} />
  </div>
);

const Explore = ({ match }) => (
  <div>
    <SearchBar exploring message={message} url={url} />
    <MindMap url={`maps/${match.params.path}`} />
    <SnackBar message={message} />
  </div>
);

window.onload = () => {
  render(
    <Router>
      <div>
        <Route exact path="/" component={Root} />
        <Route path="/:path" render={Explore} />
      </div>
    </Router>,
    document.getElementById('react-app'),
  );

  document.body.onclick = (e) => {
    if ((e.target.tagName === 'A' || e.target.tagName === 'IMG')
        && e.target.href.indexOf('https://my.mindnode.com/') !== -1) {
      e.preventDefault();

      const id = e.target.href.replace(/^.*mindnode.com\/(.{40}).*/, '$1');
      getJSON(`/maps-lookup/${id}`, ({ title }) => url.set(`/${title}`));
    }
  };
};
