import { Component } from 'react';
import { Provider } from 'react-redux';
import SearchBar from '../components/SearchBar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import MindMapWrapper from '../components/MindMapWrapper.jsx';
import SnackBar from '../components/SnackBar.jsx';
import fetchMap from '../actions/fetchMap';
import store from '../store/store';
import PathPicker from './PathPicker.jsx';
import '../themes/_PearlWhite.sass';

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
    switch (pathname) {
      case '/thank-you':
        return (
          <Provider store={this.props.store}>
            <div>
              <h1 className="thank-you">Thank you</h1>
              <h2 className="thank-you">
                For{' '}
                <a
                  className="patreon-link"
                  href="http://patreon.com/learnanything"
                >
                  supporting our project
                </a>
              </h2>
              <h2 className="thank-you">You are amazing 💛</h2>
              <MindMapWrapper />
              <Sidebar />
              <SnackBar />
            </div>
          </Provider>
        );
      case '/path-picker':
        return (
          <Provider store={this.props.store}>
            <div>
              <PathPicker />
            </div>
          </Provider>
        );
      default:
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
}
