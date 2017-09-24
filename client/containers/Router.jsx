import { Route } from 'react-router-dom';

import Sidebar from 'components/Sidebar';
import Home from './Home';
import Map from './Map';

export default function () {
  return (
    <div className="app-container">
      <Sidebar />
      <Route exact path="/" component={Home} />
      <Route path="/:path(.+)" component={Map} />
    </div>
  );
}
