import { hierarchy } from 'd3-hierarchy';
import flextree from 'd3-flextree-v4';


export default function (nodes, nodeSizes) {
  if (!nodes || !nodes.null) {
    return null;
  }

  const tree = flextree()
    .spacing(() => 20)
    .nodeSize(({ data }) => {
      const { height, width } = nodeSizes[data.nodeID];
      return [height, width];
    });

  // Specify the root node of the map, and the function to get children out of
  // any given node.
  const h = hierarchy(nodes.null, d => nodes[d.nodeID] || []);
  const data = tree(h);

  const n = data.descendants();
  return { data, nodes: n };
}
