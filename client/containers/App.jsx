import { Component } from 'react';
import { Provider } from 'react-redux';
import SearchBar from '../components/SearchBar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import MindMapWrapper from '../components/MindMapWrapper.jsx';
import SnackBar from '../components/SnackBar.jsx';
import fetchMap from '../actions/fetchMap';
import store from '../store/store';
import '../themes/_Night.sass';

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
          <Sidebar />
          <MindMapWrapper />
          <SnackBar />
        </div>
      </Provider>
    );
  }
}
