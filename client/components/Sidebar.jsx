import { Component, PropTypes } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { connect } from 'react-redux';
import setMenu from '../actions/setMenu';
import '../sass/_Sidebar.sass';

@connect(store => ({
  selected: store.menu.selected,
  theme: store.menu.theme
}))
export default class Sidebar extends Component {
  showSettings(event) {
    if (event.target.id.startsWith('option-')) {
      if (this.props.selected === event.target.id) {
        this.props.dispatch(setMenu(''));
      } else {
        this.props.dispatch(setMenu(event.target.id));
      }
    }
    switch (event.target.id) {
      case 'white':
        require('../themes/_PearlWhite.sass');
        break;
      case 'night':
        require('../themes/_Night.sass');
        break;
      case 'grey':
        require('../themes/_Grey.sass');
        break;
    }
  }

  render() {
    switch (this.props.selected) {
      case '':
        return (
          <Menu right width={340}>
            <h1>
              <div
                id="option-themes"
                onClick={this.showSettings.bind(this)}
                className="menu-item">
                Themes 🖌
              </div>
            </h1>
          {/*<h1>
              <div id="option-bookmarks" className="menu-item">
                Bookmarks 🔖
              </div>
            </h1>
            <h1>
              <div id="option-learned-maps" className="menu-item">
                Learned Maps ✅
              </div>
            </h1>
            <h1>
              <div id="option-path-picker" className="menu-item">
                Path Picker 🗺
              </div>
            </h1>*/}
          </Menu>
        );
      case 'option-themes':
        return (
          <Menu right width={340}>
            <h1>
              <div
                id="themes"
                onClick={this.showSettings.bind(this)}
                className="menu-item"
              >
                Themes 🖌
              </div>
            </h1>
            <h1>
              <div
                id="grey"
                onClick={this.showSettings.bind(this)}
                className="menu-item"
              >
                Night 🌃
              </div>
            </h1>
            <h1>
              <div
                id="white"
                onClick={this.showSettings.bind(this)}
                className="menu-item"
              >
                Pearl White ⚪
              </div>
            </h1>
            {/*<h1>
                <div
                  id="night"
                  onClick={this.showSettings.bind(this)}
                  className="menu-item"
                >
                  Night 🌃
                </div>
              </h1>
              <h1>
              <div
                id="theme-create"
                onClick={this.showSettings.bind(this)}
                className="menu-item"
              >
                Create your own
              </div>
            </h1> */}
          </Menu>
        );
      case 'option-bookmarks':
        return (
          <div>
            <Menu right width={340} />
            <h1>
              <div
                id="coming-soon"
                onClick={this.showSettings.bind(this)}
                className="menu-item"
              >
                Night 🌃
              </div>
            </h1>
          </div>
        );
      case 'option-learned-maps':
        return (
          <div>
            <Menu right width={340} />
            <h1>
              <div
                id="coming-soon"
                onClick={this.showSettings.bind(this)}
                className="menu-item"
              >
                Night 🌃
              </div>
            </h1>
          </div>
        );
      default:
        break;
    }
  }
}
