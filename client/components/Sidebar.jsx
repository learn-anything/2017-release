import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import MediaQuery from 'react-responsive';

import { showDialog } from 'actions/Dialog';
import { showLegend } from 'actions/Legend';
import queries from 'constants/media-queries.json';
import 'sass/_Sidebar.sass';

@connect(store => ({
  isVisible: store.header.menu,
}))
export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };

    this.showAbout = this.showAbout.bind(this);
    this.showLegend = this.showLegend.bind(this);
    this.hideSidebar = this.hideSidebar.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    window.laAuth.login();
    this.hideSidebar();
  }

  logout() {
    window.laAuth.logout();
    this.hideSidebar();
  }

  hideSidebar() {
    this.setState({ isOpen: false });
  }

  showAbout() {
    this.props.dispatch(showDialog(__('about')));
    this.hideSidebar();
  }

  showLegend() {
    this.props.dispatch(showLegend());
    this.hideSidebar();
  }

  render() {
    if (!this.props.isVisible) {
      return null;
    }

    // home, support, about, github, night mode
    return (
      <Menu
        isOpen={this.state.isOpen}
        className="sidebar-menu"
        width={250}
        right
      >
        {window.laAuth.isAuthenticated() ? (
          <div className="sidebar-item">
            <a onClick={this.logout}>{__('sidebar_logout')}</a>
          </div>
        ) : (
            <div className="sidebar-item">
              <a onClick={this.login}>{__('sidebar_login')}</a>
            </div>
          )}

        <div className="sidebar-item">
          <Link onClick={this.hideSidebar} to="/">
            {__('sidebar_home')}
          </Link>
        </div>

        {/* <div className="sidebar-item">
          <Link onClick={this.hideSidebar} to="/learn-anything">{__('sidebar_all_topics')}</Link>
        </div> */}

        <div className="sidebar-item">
          <a onClick={this.showAbout}>{__('sidebar_about')}</a>
        </div>

        <div className="sidebar-item">
          <a href="https://twitter.com/learnanything_" target="_blank">
            {__('sidebar_twitter')}
          </a>
        </div>

        <div className="sidebar-item">
          <a href="https://www.patreon.com/learnanything" target="_blank">
            {__('sidebar_patreon')}
          </a>
        </div>

        <div className="sidebar-item">
          <a
            href="https://github.com/learn-anything/learn-anything"
            target="_blank"
          >
            {__('sidebar_github')}
          </a>
        </div>

        <div className="sidebar-item">
          <a
            href="https://github.com/learn-anything/curated-lists#readme"
            target="_blank"
          >
            {__('sidebar_lists')}
          </a>
        </div>

        <MediaQuery maxWidth={queries.s}>
          <div className="sidebar-item">
            <a onClick={this.showLegend}>{__('sidebar_legend')}</a>
          </div>
        </MediaQuery>
      </Menu>
    );
  }
}
