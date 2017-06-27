import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MindMap from 'react-mindmap';
import Breadcrumbs from '../components/Breadcrumbs.jsx';

@connect(store => ({
  connections: store.map.connections,
  subnodes: store.map.subnodes,
  nodes: store.map.nodes,
}))
export default class MindMapWrapper extends Component {
  render() {
    return (
      <div>
        <Breadcrumbs />
        <MindMap
          connections={this.props.connections}
          subnodes={this.props.subnodes}
          nodes={this.props.nodes}
        />
      </div>
    );
  }
}
