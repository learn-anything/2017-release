import { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from 'components/Sidebar';
import fetchMap from 'actions/fetchMap';
import * as Pages from 'constants/Pages';
import 'themes/_PearlWhite.sass';
import 'themes/_Grey.sass';

@connect(store => ({
  title: store.map.title,
  theme: store.theme,
  query: store.search.query,
  suggestions: store.search.suggestions,
  placeholder: store.search.placeholder,
}))
export default class App extends Component {
  renderContent(pathname) {
    switch (pathname) {
      case '/thank-you':
        return Pages.thankYou(this);

      default:
        return Pages.map(this);
    }
  }

  render() {
    const pathname = window.location.pathname;
    ga('send', 'pageview', pathname);

    // If the page is loaded on a url different from the root,
    // load the corresponding map.
    if (pathname !== '/') {
      this.props.dispatch(fetchMap(pathname));
    }

    return (
      <div>
        <Sidebar theme={this.props.theme} />
        {this.renderContent(pathname)}
      </div>
    );
  }
}
