import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Auth from 'utils/Auth';
import Sidebar from 'components/Sidebar';
import Home from './Home';
import Map from './Map';


const Callback = () => {
  window.laAuth.handleAuthentication();
  return null;
};


@withRouter
export default class Router extends Component {
  componentWillMount() {
    window.laAuth = new Auth(this.props.history);
  }

  render() {
    return (
      <div className="app-container">
        <Sidebar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/callback" component={Callback} />
          <Route path="/:path(\d*)" component={Map} /> {/* redirect to named path */}
          <Route path="/:path(.*)" component={Map} />
        </Switch>
      </div>
    );
  }
}
