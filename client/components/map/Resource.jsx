import React, { Component } from 'react';
import { connect } from 'react-redux';

import { voteResource } from 'actions/Map';
import categoryToIcon from 'utils/categoryToIcon';
import classNames from 'utils/classNames';


@connect((store, { resource }) => ({
  vote: store.map.votes[resource.resourceID],
}))
export default class Resource extends Component {
  constructor(props) {
    super(props);

    this.vote = this.vote.bind(this);
  }

  vote(event) {
    const { resourceID } = this.props.resource;
    let direction;

    if (event.target.className.includes('upvote')) {
      direction = 1;
    }

    if (event.target.className.includes('downvote')) {
      direction = -1;
    }

    if (event.target.className.includes('--highlighted')) {
      direction = 0;
    }

    this.props.dispatch(voteResource(resourceID, direction));
  }

  render() {
    const { url, category, text, score } = this.props.resource;
    const { vote } = this.props;

    if (!url || !text) {
      return null;
    }

    const upClassNames = classNames({
      upvote: true,
      'upvote--highlighted': Number(vote) === 1,
    });

    const downClassNames = classNames({
      downvote: true,
      'downvote--highlighted': Number(vote) === -1,
    });
    const imgSrc = categoryToIcon(category);

    return (
      <div className="resource">
        <a href={url} className="resource-link">
          <div className="category">
            <img src={imgSrc} alt={category || 'other'}/>
          </div>

          <div className="resource-text">{text}</div>
        </a>

        <div className="score">
          <div
            className={downClassNames}
            onClick={this.vote}
            onTouchEnd={this.vote}
          >-</div>
          <div className="score-value">{score.up - score.down}</div>
          <div
            className={upClassNames}
            onClick={this.vote}
            onTouchEnd={this.vote}
          >+</div>
        </div>
      </div>
    );
  }
}


Resource.defaultProps = {
  // The structure for resource is the following:
  // { url, category, text, resourceID, score }
  resource: {},
};
