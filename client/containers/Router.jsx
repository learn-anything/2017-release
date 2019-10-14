import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Auth from 'utils/Auth';
import Sidebar from 'components/Sidebar';
import Dialog from 'components/Dialog';
import Legend from 'components/Legend';
import store from 'store/store';
import actions from 'constants/actions.json';
import HomePage from './HomePage';
import MapPage from './MapPage';


const Callback = () => {
  window.laAuth.handleAuthentication();
  return null;
};


@withRouter
export default class Router extends Component {
  componentWillMount() {
    window.laAuth = new Auth(this.props.history);
    store.dispatch({
      type: actions.ga.pageview,
      payload: this.props.history.location.pathname,
    });
  }

  componentWillUpdate(nextProps) {
    store.dispatch({
      type: actions.ga.pageview,
      payload: nextProps.history.location.pathname,
    });
  }

  render() {
    return (
      <div className="app-container">
        <Sidebar />

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/callback" component={Callback} />
          <Route path="/:path(\d*)" component={MapPage} /> {/* redirect to named path */}
          <Route path="/:path(.*)" component={MapPage} />
        </Switch>

        <Dialog />
        <Legend />
      </div>
    );
  }
}
