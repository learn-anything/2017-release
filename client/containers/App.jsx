import { Component } from 'react';
import { Provider } from 'react-redux';
import SearchBar from './SearchBar.jsx';
import MindMapWrapper from '../components/MindMapWrapper.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import SnackBar from '../components/SnackBar.jsx';
import fetchMap from '../actions/fetchMap';
import store from '../store/store';

/*
 * Needs Redux store as prop.
 */
export default class App extends Component {
  render() {
    const pathname = window.location.pathname;
    ga('send', 'pageview', pathname);

    // If the page is loaded on a url different from the root,
    // load the corresponding map.
    if (pathname !== '/') {
      store.dispatch(fetchMap(pathname));
    }

    return (
      <Provider store={this.props.store}>
        <div>
          <SearchBar />
          <Breadcrumbs />
          <MindMapWrapper />
          <SnackBar />
        </div>
      </Provider>
    );
  }
}
