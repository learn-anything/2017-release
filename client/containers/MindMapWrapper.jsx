import React, { Component } from 'react';
import { connect } from 'react-redux';
import LAMap from 'la-map';

@connect(store => ({
  root: store.map.root,
  title: store.map.title,
}))
export default class MindMapWrapper extends Component {
  render() {
    console.log('mindmap-wrapper', this.props.root);

    return (
        <LAMap
          map={this.props.root}
          title={this.props.title}
        />
    );
  }
}
