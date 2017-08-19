import React, { Component } from 'react';
import 'sass/_Breadcrumbs.sass';


export default class Breadcrumbs extends Component {
  onClick(splitTitle, index) {
    // Convert splitTitle from ['path', 'to', 'map']
    // to "path/to/map" format.
    const url = splitTitle.slice(0, index + 1).join('/');
    this.props.onCrumbClick(url);
  }

  renderBreadcrumbs() {
    // Title is in the form of "path - to - map".
    const splitTitle = this.props.title.split(' - ');

    return splitTitle.map((topic, index) => (
      <span key={index} onClick={this.onClick.bind(this, splitTitle, index)}>
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

Breadcrumbs.defaultProps = {
  title: '',
  onCrumbClick: () => {},
};
