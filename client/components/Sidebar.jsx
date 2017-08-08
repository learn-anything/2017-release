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

    return (
      <Menu className="sidebar-menu" width={340} right>
        <div className="sidebar-menu-block">
          <div onClick={this.toggleVisibility} className="sidebar-menu-item">
            {__('sidebar_themes_title')}
          </div>

          <div className="sidebar-menu-options">
            <div onClick={this.changeTheme} data-theme="Night">{__('sidebar_themes_night')}</div>
            <div onClick={this.changeTheme} data-theme="PearlWhite">{__('sidebar_themes_white')}</div>
          </div>
        </div>

        <div className="sidebar-menu-block">
          <div onClick={this.toggleVisibility} className="sidebar-menu-item">
            {__('sidebar_tips_title')}
          </div>

          <div
            className="sidebar-menu-options"
            dangerouslySetInnerHTML={{ __html: __('sidebar_tips_content') }}
          />
        </div>
      </Menu>
    );
  }
}

Sidebar.defaultProps = {
  title: '',
  dispatch: () => {},
};
