import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';

import setTheme from 'actions/setTheme';
import 'sass/_Sidebar.sass';


export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.changeTheme = this.changeTheme.bind(this);
  }

  toggleVisibility(event) {
    const options = event.target.nextSibling;
    options.classList.toggle('sidebar-menu-options--visible');
  }

  changeTheme(event) {
    const theme = event.target.getAttribute('data-theme');
    this.props.dispatch(setTheme(theme));
  }

  render() {
    document.body.className = this.props.theme;

    // home, support, about, github, night mode
    return (
      <Menu className="sidebar-menu" width={250} right>
        <div className="sidebar-menu-item">
          {__('sidebar_home')}
        </div>

        <div className="sidebar-menu-item">
          {__('sidebar_support')}
        </div>

        <div className="sidebar-menu-item">
          {__('sidebar_about')}
        </div>

        <div className="sidebar-menu-item">
          {__('sidebar_github')}
        </div>
      </Menu>
    );
  }
}

Sidebar.defaultProps = {
  title: '',
  dispatch: () => {},
};
