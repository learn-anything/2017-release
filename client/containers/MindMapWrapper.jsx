import React, { Component } from 'react';
import { connect } from 'react-redux';
import LAMap from 'la-map';
import axios from 'axios';
import { updateResource } from 'actions/Map';


@connect(store => ({
  nodes: store.map.nodes,
  resources: store.map.resources,
}))
export default class MindMapWrapper extends Component {
  vote(resourceID, direction, nodeID) {
    if (window.laAuth.isAuthenticated()) {
      axios({
        method: 'post',
        url: '/api/votes',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        data: {
          resourceID,
          direction,
        },
      }).then(({ data }) => {
        this.props.dispatch(updateResource(nodeID, data));
      }).catch((err) => console.error(err));
    }
  }

  render() {
    return (
        <LAMap
          nodes={this.props.nodes}
          resources={this.props.resources}
          vote={this.vote.bind(this)}
        />
    );
  }
}
