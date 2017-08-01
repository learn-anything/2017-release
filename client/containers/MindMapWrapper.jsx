import React, { Component } from 'react';
import { connect } from 'react-redux';
import MindMap from 'react-mindmap';
import fetchMap from 'actions/fetchMap';
import Breadcrumbs from 'components/Breadcrumbs';

@connect(store => ({
  connections: store.map.connections,
  nodes: store.map.nodes,
  title: store.map.title,
}))
export default class MindMapWrapper extends Component {
  constructor(props) {
    super(props);

    this.onCrumbClick = this.onCrumbClick.bind(this);
  }

  onCrumbClick(url) {
    this.props.dispatch(fetchMap(url));
  }

  render() {
    const pathname = window.location.pathname;

    return (
      <div>
        {
          pathname !== '/thank-you' ?
          <Breadcrumbs
            title={this.props.title}
            onCrumbClick={this.onCrumbClick}
          /> : ''
        }
        <MindMap
          connections={this.props.connections}
          nodes={this.props.nodes}
        />
      </div>
    );
  }
}
