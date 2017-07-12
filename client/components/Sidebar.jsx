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
    if (this.props.selected === 'themes') {
      this.props.dispatch(setMenu(''));
    } else {
      this.props.dispatch(setMenu('themes'));
    }
  }

  render() {
    switch (this.props.selected) {
      case '':
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
              <div id="saved-maps" className="menu-item">
                Bookmarks 🔖
              </div>
            </h1>
            <h1>
              <div id="saved-maps" className="menu-item">
                Learned Maps ✅
              </div>
            </h1>
            <h1>
              <div id="saved-maps" className="menu-item">
                Path Picker 🗺
              </div>
            </h1>
          </Menu>
        );
      case 'themes':
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
                id="gray"
                onClick={this.showSettings.bind(this)}
                className="menu-item"
              >
                Gray Theme
              </div>
            </h1>
            <h1>
              <div
                id="white"
                onClick={this.showSettings.bind(this)}
                className="menu-item"
              >
                White Theme
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
            </h1>
          </Menu>
        );
      case 'bookmarks':
        return <Menu right width={340} />;
      case 'learned maps':
        return <Menu right width={340} />;
      default:
        break;
    }
  }
}
