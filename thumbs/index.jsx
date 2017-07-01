import { render } from 'react-dom';
import MindMap from 'react-mindmap';

render(
  <MindMap
    nodes={map.nodes}
    subnodes={map.subnodes}
    connections={map.connections}
  />,
  document.getElementById('root')
);
