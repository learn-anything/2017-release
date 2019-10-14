import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import classNames from 'utils/classNames';
import queries from 'constants/media-queries.json';
import 'sass/_Breadcrumbs.sass';


@connect(store => ({
  title: store.map.title,
  nodes: store.map.nodes,
  isVisible: store.header.breadcrumbs,
}))
export default class Breadcrumbs extends Component {
  constructor(props) {
    super(props);

    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.renderBreadcrumbs = this.renderBreadcrumbs.bind(this);
    this.renderMobileBreadcrumbs = this.renderMobileBreadcrumbs.bind(this);

    this.state = {
      expanded: false,
    };
  }

  getURL(splitTitle, index) {
    // Convert splitTitle from ['path', 'to', 'map']
    // to "path/to-map" format.
    const url = splitTitle.slice(0, index + 1).join('/').replace(/ /g, '-');
    return `/${url}`;
  }

  toggleExpanded() {
    this.setState({ expanded: !this.state.expanded });
  }

  renderBreadcrumbs() {
    // Title is in the form of "path - to - map".
    const splitTitle = this.props.title.split(' - ');

    return splitTitle.map((topic, index) => (
      <Link to={this.getURL(splitTitle, index)} key={index}>{topic}</Link>
    ));
  }

  renderMobileBreadcrumbs() {
    // Title is in the form of "path - to - map".
    const splitTitle = this.props.title.split(' - ');
    const nodesCount = Object.keys(this.props.nodes).length;

    return (
      <div>
        {this.props.isVisible &&
          <div className="breadcrumbs-mobile-title" onClick={this.toggleExpanded}>
            {splitTitle[splitTitle.length - 1]}
          </div>
        }

        {this.state.expanded &&
          <div className="breadcrumbs-mobile-description">
            <div className="breadcrumbs-mobile-nodes-count">{`${nodesCount} ${__('searchbar_nodes_count')}`}</div>
            <div className="breadcrumbs-mobile-path-title">{__('breadcrumbs_mobile_path')}</div>
            <div className="breadcrumbs-mobile-path">
              {
                splitTitle.map((topic, index) => (
                  <Link
                    to={this.getURL(splitTitle, index)}
                    key={index}
                    onClick={this.toggleExpanded}
                  >
                    {topic}
                  </Link>
                ))
              }
            </div>

            <button
              className="breadcrumbs-mobile-close-btn"
              onClick={this.toggleExpanded}
            >
              &#x2715;
            </button>
          </div>
        }
      </div>
    );
  }

  render() {
    const className = classNames({
      'breadcrumbs-mobile': true,
      'breadcrumbs-mobile--expanded': this.state.expanded,
    });

    return (
      <div className="breadcrumbs">
        <MediaQuery maxWidth={queries.s}>
          <div className={className}>
            {this.renderMobileBreadcrumbs()}
          </div>
        </MediaQuery>
        <MediaQuery minWidth={queries.s + 1}>
          <div className="breadcrumbs-desktop">
            {this.renderBreadcrumbs()}
          </div>
        </MediaQuery>
      </div>
    );
  }
}
