import { Component } from 'react';
import { connect } from 'react-redux';
import fetchMap from 'actions/fetchMap';
import 'sass/_Breadcrumbs.sass';

@connect(store => ({ title: store.map.title }))
export default class Breadcrumbs extends Component {
  onClick() {
    // Convert splitTitle from ['path', 'to', 'map']
    // to "path/to/map" format.
    let url = this.splitTitle.slice(0, this.index + 1).join('/');
    url = url.replace(/ /g, '-');

    this.props.dispatch(fetchMap(url));
  }

  renderBreadcrumbs() {
    // Title is in the form of "path - to - map".
    const splitTitle = this.props.title.split(' - ');

    return splitTitle.map((topic, index) => (
      <span onClick={this.onClick.bind({ ...this, splitTitle, index })}>
        {topic}
      </span>
    ));
  }

  render() {
    return (
      <div className="breadcrumbs">
        {this.renderBreadcrumbs()}
      </div>
    );
  }
}
