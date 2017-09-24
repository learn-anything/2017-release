import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'sass/_Breadcrumbs.sass';


export default class Breadcrumbs extends Component {
  getURL(splitTitle, index) {
    // Convert splitTitle from ['path', 'to', 'map']
    // to "path/to-map" format.
    const url = splitTitle.slice(0, index + 1).join('/').replace(/ /g, '-');
    return `/${url}`;
  }

  renderBreadcrumbs() {
    // Title is in the form of "path - to - map".
    const splitTitle = this.props.title.split(' - ');

    return splitTitle.map((topic, index) => (
      <Link to={this.getURL(splitTitle, index)}>{topic}</Link>
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

Breadcrumbs.defaultProps = { title: '' };
