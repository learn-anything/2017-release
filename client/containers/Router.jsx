import { Switch, Route } from 'react-router-dom';

import Sidebar from 'components/Sidebar';
import Home from './Home';
import Map from './Map';

export default function () {
  return (
    <div className="app-container">
      <Sidebar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:path(\d*)" component={Map} /> {/* redirect to named path */}
        <Route path="/:path(.*)" component={Map} />
      </Switch>
    </div>
  );
}
