import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Sidebar from 'components/Sidebar';
import Dialog from 'components/Dialog';
import Legend from 'components/Legend';
import HomePage from './HomePage';
import MapPage from './MapPage';

@withRouter
export default class Router extends Component {
  componentWillMount() {
    window.laHistory = this.props.history;
  }

  render() {
    return (
      <div className="app-container">
        <Sidebar />

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/:path(\d*)" component={MapPage} />
          {/* redirect to named path */}
          <Route path="/:path(.*)" component={MapPage} />
        </Switch>

        <Dialog />
        <Legend />
      </div>
    );
  }
}
