import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import fetchMap from '../actions/fetchMap';
import { clearQuery } from '../actions/Search';
import '../sass/_Breadcrumbs.sass';

@connect(store => ({
  history: store.history,
}))
export default class Breadcrumbs extends Component {
  dispatch() {
    const url = this.path.slice(0, this.index + 1).join('/');
    this.props.dispatch(fetchMap(url));
    this.props.dispatch(clearQuery());
    ga('send', 'pageview', `/${url}`);
  }

  render() {
    let breadcrumbs = '';

    if (this.props.history) {
      const splitUrl = this.props.history.location.pathname.slice(1).split('/');

      breadcrumbs = splitUrl.map((el, index) => (
        <span onClick={this.dispatch.bind({ ...this, splitUrl, index })}>
          {el.replace(/-/g, ' ')}
        </span>
      ));
    }

    return (
      <div className="breadcrumbs">
        {breadcrumbs}
      </div>
    );
  }
}
