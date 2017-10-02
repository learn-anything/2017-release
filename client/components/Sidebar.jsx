import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

import 'sass/_Sidebar.sass';


export default class Sidebar extends Component {
  render() {
    // home, support, about, github, night mode
    return (
      <Menu className="sidebar-menu" width={250} right>
        { window.laAuth.isAuthenticated() ?
          <div className="sidebar-item">
            <a onClick={window.laAuth.logout}>{__('sidebar_logout')}</a>
          </div>
          :
          <div className="sidebar-item">
            <a onClick={window.laAuth.login}>{__('sidebar_login')}</a>
          </div>
        }

        <div className="sidebar-item">
          <Link to="/">{__('sidebar_home')}</Link>
        </div>

        <div className="sidebar-item">
          <Link to="/learn-anything">{__('sidebar_all_topics')}</Link>
        </div>

        <div className="sidebar-item">
          {__('sidebar_support')}
        </div>

        <div className="sidebar-item">
          {__('sidebar_about')}
        </div>

        <div className="sidebar-item">
          <a href="https://github.com/learn-anything/learn-anything" target="_blank">{__('sidebar_github')}</a>
        </div>
      </Menu>
    );
  }
}
