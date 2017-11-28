import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';
import { AutoSizer } from 'react-virtualized';
import Node from 'components/map/Node';

import getTreeData from 'utils/getTreeData';
import 'sass/_MapRender.sass';


// TODO - fix touch on links on mobile
// nodes show all overlapped for a short amount of time
// fix initial position of map
// fix when dragging, the event shouldn't propagate to children components
@connect(store => ({
  title: store.map.title,
  nodes: store.map.nodes,
  nodeSizes: store.map.nodeSizes,
}))
export default class MapRender extends Component {
  constructor(props) {
    super(props);

    this.getTreeLevelXs = this.getTreeLevelXs.bind(this);
    this.renderLinks = this.renderLinks.bind(this);
    this.renderNodes = this.renderNodes.bind(this);

    this.state = {
      renderedNodes: null,
      finishedRender: false,
      renderedLinks: null,
    };
  }

  // We could get nodes from the props, but in this case the nodes we are
  // getting haven't been set as a prop yet.
  renderNodes(nodes) {
    const renderedNodes = [];

    // nodes is an object with `parentID`s as keys and arrays of nodes as values
    Object.keys(nodes).forEach((parent) => {
      let children = nodes[parent];

      // This is the case of the root node, which is not an array, but a
      // single object.
      if (children.length === undefined) {
        children = [children];
      }

      children.forEach(node => renderedNodes.push((
        <Node node={node} key={node.nodeID} pos={node.pos} />
      )));
    });

    return renderedNodes;
  }

  renderLinks(nodes) {
    const { nodeSizes } = this.props;

    return nodes.map((node) => {
      const { parentSize, parentPos } = node;
      const childPos = node.pos;
      const childSize = nodeSizes[node.nodeID];

      if (!node.parentID) {
        return null;
      }

      // Y is X, X is Y, and everything you know is a lie.
      const d = [
        'M',
        childPos.y + 15,
        childPos.x + (childSize.height / 2) + 20,
        'L',
        parentPos.y + parentSize.width - 30,
        parentPos.x + (parentSize.height / 2) + 20,
      ];

      return (<path key={node.nodeID} className="link" d={d.join(' ')} />);
    });
  }

  componentWillReceiveProps(nextProps) {
    // Check for more cases, as we could be rendering the same map again. e.g.
    // users votes on something and component is reloaded to show the vote.
    if (this.props.title !== nextProps.title) {
      // Render nodes and save them on state and reset finishedRender, so it
      // positions the nodes correctly after mounting them.
      this.setState({
        renderedNodes: this.renderNodes(nextProps.nodes),
        renderedLinks: null,
        finishedRender: false,
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div className="map">
        <AutoSizer>
          {({ width, height }) => (width === 0 || height === 0 ? null : (
            <ReactSVGPanZoom
              tool="auto"
              width={width}
              height={height}
              detectAutoPan={false}
              toolbarPosition="none"
              miniaturePosition="none"
            >
              <svg className="map" viewBox="0 0 1000 1000">
                <g>
                  {this.state.renderedLinks}
                  {this.state.renderedNodes}
                </g>
              </svg>
            </ReactSVGPanZoom>
          ))}
        </AutoSizer>
      </div>
    );
  }

  // Return the initial X coordinate for each level of tree.
  getTreeLevelXs(treeNodes) {
    const { nodeSizes } = this.props;
    const maxWidths = [];

    // Get the max width of each level.
    treeNodes.forEach(({ depth, data }) => {
      if (!maxWidths[depth] || maxWidths[depth] < nodeSizes[data.nodeID].width) {
        maxWidths[depth] = nodeSizes[data.nodeID].width;
      }
    });

    return maxWidths.reduce((sum, value, index) => {
      // Take the current width and add all the previous width, plus the margin
      // between each level.
      sum.push(Number(value) + Number(sum[index]) + 100);
      return sum;
    }, [0]);
  }

  componentDidUpdate(prevProps) {
    const { nodes, nodeSizes } = this.props;
    const isDifferentMap = prevProps.title !== this.props.title;

    // Component is not done rendering and it has data that should be rendered.
    const shouldRender = !this.state.finishedRender && this.state.renderedNodes;

    // nodeSizes is not an empty object, which means, we have the sizes for all nodes.
    const hasNodeSizes = nodes.null && nodeSizes[nodes.null.nodeID];

    if ((isDifferentMap || shouldRender) && hasNodeSizes) {
      const treeData = getTreeData(nodes, nodeSizes);
      const levelXs = this.getTreeLevelXs(treeData.nodes);
      const nodesWithPosition = treeData.nodes.map(({ data, x, depth, parent }) => {
        let parentPos = {};
        let parentSize = {};
        if (parent) {
          parentPos = { x: parent.x, y: levelXs[parent.depth] };
          parentSize = nodeSizes[parent.data.nodeID];
        }

        return {
          ...data,
          parentPos,
          parentSize,
          pos: { x, y: levelXs[depth] },
        };
      });

      this.setState({
        renderedNodes: this.renderNodes(nodesWithPosition),
        renderedLinks: this.renderLinks(nodesWithPosition),
        finishedRender: true,
      });
    }
  }
}
