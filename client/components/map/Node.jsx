import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setNodeSize } from 'actions/Map';
import { showDialog } from 'actions/Dialog';
import categoryToIcon from 'utils/categoryToIcon';
import Resource from 'components/map/Resource';
import NewResourceForm from 'components/NewResourceForm';


// Size is in the following format
// { width, height }
@connect((store, { node }) => ({
  size: store.map.nodeSizes[node.nodeID] || {},
  resources: store.map.resources[node.nodeID] || [],
  editing: store.map.editing,
}))
export default class Node extends Component {
  constructor(props) {
    super(props);

    this.renderNode = this.renderNode.bind(this);
    this.resourcesShowMore = this.resourcesShowMore.bind(this);
    this.addResourceDialog = this.addResourceDialog.bind(this);
  }

  componentDidMount() {
    const size = {
      height: this.ref.clientHeight,
      width: this.ref.clientWidth,
    };

    this.props.dispatch(setNodeSize(this.props.node.nodeID, size));
  }

  addResourceDialog() {
    this.props.dispatch(showDialog(<NewResourceForm node={this.props.node} />, {
      isJsx: true,
      closeButton: false,
      overlayDismiss: false,
    }));
  }

  resourcesShowMore() {
    const { node, resources } = this.props;

    this.props.dispatch(showDialog(
      (
        <div className="dialog-body">
          <h1 className="title-text">{node.text}</h1>
          <div className="node-resources">
            {resources.map(res => <Resource key={res.resourceID} resource={res} />)}
          </div>
          <div className="md-separator"></div>
        </div>
      ),
      { isJsx: true },
    ));
  }

  renderResources(resources) {
    return resources.map((res, index) => {
      if (index === 5) {
        return (
          <div
            key="show_more"
            className="resources-show-more"
            onClick={this.resourcesShowMore}
            onTouchEnd={this.resourcesShowMore}
          >
            {__('resources_show_more').replace('{}', resources.length - 5)}
          </div>
        );
      }

      if (index > 5) {
        return null;
      }

      return (<Resource key={res.resourceID} resource={res} />);
    });
  }

  renderNode() {
    const { node, resources } = this.props;
    const stat = resources.length ? `${resources.length} ${__('node_resources')}` : '';

    // If there's no resources or the only resource present is another map.
    if (resources.length === 0 || (resources.length === 1 && resources[0].category === 'mindmap')) {
      const res = {};

      if (resources[0]) {
        res.icon = categoryToIcon('mindmap');
        res.url = resources[0].url;
        res.category = resources[0].category;
      }

      return (
        <div className="node--collapsed">
          <a href={res.url} className="node-resource" disabled={this.props.editing}>
            <div className="node-title">{node.text}</div>
            <div className="category">
              {res.icon && <img src={res.icon} alt={res.category} />}
            </div>
          </a>
        </div>
      );
    }

    // Sort resources.
    const sortedResources = resources.sort((a, b) => (
      (a.score.up - a.score.down) < (b.score.up - b.score.down)
    ));

    return (
      <div>
        <div className="node-header">
          <div className="node-title">{node.text}</div>
          <div className="node-stat">{stat}</div>
        </div>

        <div className="node-resources" disabled={this.props.editing}>
          {this.renderResources(sortedResources)}
        </div>
      </div>
    );
  }

  render() {
    const { size, pos } = this.props;

    return (
      <foreignObject
        className="node"
        width={size.width}
        height={size.height}
        transform={`translate(${pos.y}, ${pos.x})`}
      >
        <div ref={(el) => { this.ref = el; }}>{this.renderNode()}</div>
        {this.props.editing &&
          <button
            className="contribute-add-resource"
            onClick={this.addResourceDialog}
            onTouchEnd={this.addResourceDialog}
          >
            {__('contribute_add_resource')}
          </button>
        }
      </foreignObject>
    );
  }
}

Node.defaultProps = {
  pos: { x: 0, y: 0 },
  resources: [],
  node: {},

  // votes has the following format { resourceID: direction }
  votes: {},
};
