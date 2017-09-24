import React, { Component } from 'react';
import { connect } from 'react-redux';
import MindMap from 'react-mindmap';

@connect(store => ({
  connections: store.map.connections,
  nodes: store.map.nodes,
}))
export default class MindMapWrapper extends Component {
  render() {
    return (
        <MindMap
          connections={this.props.connections}
          nodes={this.props.nodes}
        />
    );
  }
}
