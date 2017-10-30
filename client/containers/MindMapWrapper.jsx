import React, { Component } from 'react';
import { connect } from 'react-redux';
import LAMap from 'la-map';
import axios from 'axios';
import { updateResource } from 'actions/Map';


@connect(store => ({
  nodes: store.map.nodes,
  resources: store.map.resources,
  mapID: store.map.mapID,
}))
export default class MindMapWrapper extends Component {
  vote(resourceID, direction, nodeID) {
    if (window.laAuth.isAuthenticated()) {
      axios({
        method: 'post',
        url: '/api/votes',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        data: {
          resourceID,
          direction,
        },
      }).then(({ data }) => {
        this.props.dispatch(updateResource(nodeID, data));
        // eslint-disable-next-line no-console
      }).catch(err => console.error(err));
    } else {
      // eslint-disable-next-line no-console
      console.warn('You\'re not logged in');
    }
  }

  render() {
    return (
        <LAMap
          nodes={this.props.nodes}
          resources={this.props.resources}
          mapID={this.props.mapID}
          vote={this.vote.bind(this)}
        />
    );
  }
}
