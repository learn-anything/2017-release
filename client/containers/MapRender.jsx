import React, { Component } from 'react';
import { connect } from 'react-redux';
import { select, zoom, zoomIdentity } from 'd3';

import renderMap from 'utils/renderMap';
import { voteResource } from 'actions/Map';
import 'sass/_MapRender.sass';


@connect(store => ({
  nodes: store.map.nodes,
  resources: store.map.resources,
  mapID: store.map.mapID,
  votes: store.map.votes,
}))
export default class MapRender extends Component {
  vote(resourceID, direction) {
    this.props.dispatch(voteResource(resourceID, direction));
  }

  componentDidMount() {
    // Check that the nodes object exists and it contains the root node.
    if (this.props.nodes && this.props.nodes.null) {
      window.laMapTransform = 'translate(0, 300)';

      const votes = {};

      this.props.votes.forEach((vote) => {
        votes[vote.resourceID] = vote.direction;
      });

      renderMap(
        this.mount,
        this.props.nodes,
        this.props.resources,
        this.vote.bind(this),
        votes,
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mapID !== this.props.mapID) {
      const transform = zoomIdentity;
      zoomIdentity.y = 300;

      zoom().transform(select(this.mount), transform);
      window.laMapTransform = 'translate(0, 300)';
    }

    const votes = {};

    this.props.votes.forEach((vote) => {
      votes[vote.resourceID] = vote.direction;
    });

    // Check that the nodes object exists and it contains the root node.
    if (this.props.nodes && this.props.nodes.null) {
      renderMap(
        this.mount,
        this.props.nodes,
        this.props.resources,
        this.vote.bind(this),
        votes,
      );
    }
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div>
        <svg
          className="map"
          viewBox="0 0 1000 1000"
          ref={(input) => { this.mount = input; }}
        />
      </div>
    );
  }
}
