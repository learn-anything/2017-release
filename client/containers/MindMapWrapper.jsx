import React, { Component } from 'react';
import { connect } from 'react-redux';
import LAMap from 'la-map';

@connect(store => ({
  nodes: store.map.nodes,
  resources: store.map.resources,
}))
export default class MindMapWrapper extends Component {
  render() {
    return (
        <LAMap
          nodes={this.props.nodes}
          resources={this.props.resources}
        />
    );
  }
}
