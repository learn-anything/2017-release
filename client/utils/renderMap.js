/* eslint-disable indent, no-param-reassign */
import { select, hierarchy } from 'd3';
import flextree from 'd3-flextree-v4';
import {
  nodeToHTML,
  getHTMLSize,
  getLevelsWidth,
  d3PanZoom,
} from './renderMapUtils';


const levelMargin = 100;

// Set generated HTML and size to nodes.
const prepareNodes = (node, nodes, resources, votes) => {
  if (!node) {
    return;
  }

  node.html = nodeToHTML(node, nodes[node.nodeID], resources[node.nodeID], votes);

  const size = getHTMLSize(node.html, 'node');
  node.width = size.width;
  node.height = size.height;

  if (nodes[node.nodeID]) {
    nodes[node.nodeID].forEach(n => prepareNodes(n, nodes, resources, votes));
  }
};

export default (mount, nodesData, resources, vote, votes) => {
  const svg = select(mount);
  let index = 0;

  prepareNodes(nodesData.null, nodesData, resources, votes);

  // Clear the SVG in case there's stuff already there, and append group
  // that will contain the map.
  svg.select('*').remove();
  const map = svg.append('g').attr('transform', window.laMapTransform);

  const treemap = flextree()
    .nodeSize(({ data }) => [data.height, data.width])
    .spacing(() => 20);

  window.treemap = treemap;
  const data = treemap(hierarchy(nodesData.null, d => nodesData[d.nodeID] || []));
  window.data = data;
  const nodes = data.descendants();
  const links = data.descendants().slice(1);

  // Calculate the X coordinate (it's stored as Y but is actually X) based on
  // the width of the previus level, the parent position and a fixed margin.
  const levelsWidth = getLevelsWidth(nodes);
  nodes.forEach((d) => {
    if (!d.parent) {
      d.y = 0;
      return;
    }

    const prevLevelWidth = levelsWidth[d.depth - 1];
    d.y = d.parent.y + prevLevelWidth + levelMargin;
  });

  // Draw links
  map.selectAll('path.link')
    .data(links, (d) => {
      if (!d.id) {
        index += 1;
        d.id = index;
      }

      return d.id;
    })
    .enter().insert('path')
      .attr('class', 'link')
      .attr('d', d => `
        M ${d.y} ${d.x + (d.data.height / 2)}
        L ${d.parent.y + d.parent.data.width - 10} ${d.parent.x + (d.parent.data.height / 2)}
      `);

  // Draw nodes
  map.selectAll('foreignObject.node')
    .data(nodes, d => d.id)
    .enter().append('foreignObject')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.y}, ${d.x})`)
      .attr('height', d => d.data.height)
      .attr('width', d => d.data.width + 20)
      .html(d => d.data.html);

  map.selectAll('.upvote')
    .on('click', function upvote() {
      // data="resourceID,direction,nodeID"
      vote(...this.getAttribute('data').split(','));
    });

  map.selectAll('.downvote')
    .on('click', function upvote() {
      // data="resourceID,direction,nodeID"
      vote(...this.getAttribute('data').split(','));
    });

  // Apply pan and zoom behaviour
  svg.call(d3PanZoom(svg)).on('dblclick.zoom', null);
};
