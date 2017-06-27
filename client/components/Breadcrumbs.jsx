import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import fetchMap from '../actions/fetchMap';
import { clearQuery } from '../actions/Search';
import '../sass/_Breadcrumbs.sass';

@connect(store => ({ url: store.map.url }))
export default class Breadcrumbs extends Component {
  dispatch() {
    const url = this.splitUrl.slice(0, this.index + 1).join('/');
    this.props.dispatch(fetchMap(url));
    this.props.dispatch(clearQuery());
    ga('send', 'pageview', `/${url}`);
  }

  render() {
    const splitUrl = this.props.url.slice(1).split('/');

    const breadcrumbs = splitUrl.map((el, index) => (
      <span onClick={this.dispatch.bind({ ...this, splitUrl, index })}>
        {el.replace(/-/g, ' ')}
      </span>
    ));

    return (
      <div className="breadcrumbs">
        {breadcrumbs}
      </div>
    );
  }
}
