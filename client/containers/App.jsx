import { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from 'components/Sidebar';
import fetchMap from 'actions/fetchMap';
import { titleToURL } from 'utils/Title';
import * as Pages from './Pages';

@connect(store => ({
  title: store.map.title,
  theme: store.theme,
  query: store.search.query,
  suggestions: store.search.suggestions,
  placeholder: store.search.placeholder,
  loading: store.search.loading,
}))
export default class App extends Component {
  renderContent(pathname) {
    switch (pathname) {
      case '/thank-you':
        return Pages.thankYou.call(this);

      default:
        return Pages.map.call(this);
    }
  }

  render() {
    const pathname = window.location.pathname;
    ga('send', 'pageview', pathname);

    // If the page is loaded on a url different from the root,
    // load the corresponding map.
    if (pathname !== '/' && titleToURL(this.props.title) !== pathname) {
      this.props.dispatch(fetchMap(pathname));
    }

    return (
      <div>
        <Sidebar theme={this.props.theme} dispatch={this.props.dispatch} />
        {this.renderContent(pathname)}
      </div>
    );
  }
}
