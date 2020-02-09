import React, { Component } from 'react';
import { connect } from 'react-redux';

import categoryToIcon from 'utils/categoryToIcon';

@connect((store, { resource }) => ({
  vote: store.map.votes[resource.resourceID],
}))
export default class Resource extends Component {
  render() {
    const { url, category, text } = this.props.resource;

    if (!url || !text) {
      return null;
    }

    const imgSrc = categoryToIcon(category);

    return (
      <div className="resource">
        <a href={url} className="resource-link">
          <div className="category">
            <img src={imgSrc} alt={category || 'other'} />
          </div>

          <div className="resource-text">{text}</div>
        </a>
      </div>
    );
  }
}

Resource.defaultProps = {
  // The structure for resource is the following:
  // { url, category, text, resourceID, score }
  resource: {},
};
