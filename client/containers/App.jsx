import { Component } from 'react';
import { Provider } from 'react-redux';
import SearchBar from '../components/SearchBar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import MindMapWrapper from '../components/MindMapWrapper.jsx';
import ContributeButton from '../components/ContributeButton.jsx';
import fetchMap from '../actions/fetchMap';
import store from '../store/store';
import '../themes/_PearlWhite.sass';
import '../themes/_Grey.sass';

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
              <Sidebar />
              <h1 className="thank-you-text">
                Thank you for&nbsp;
                <a className="patreon-link" href="https://www.patreon.com/learnanything">
                  supporting our project
                </a>!
                <br/>You are amazing 💛
              </h1>
              <MindMapWrapper />
            </div>
          </Provider>
        );
      default:
        return (
          <Provider store={this.props.store}>
            <div>
              <Sidebar />
              <SearchBar />
              <MindMapWrapper />
              <ContributeButton />
            </div>
          </Provider>
        );
    }
  }
}
