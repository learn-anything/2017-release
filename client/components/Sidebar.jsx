import { Component, PropTypes } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { connect } from 'react-redux';
import setMenu from '../actions/setMenu';
import '../sass/_Sidebar.sass';
// import login from '../utils/auth';

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
    }
  }

  render() {
    switch (this.props.selected) {
      case '':
        return (
          <Menu right width={340}>
            {/*<h1>
              <div
                id="option-themes"
                onClick={login.bind(this)}
                className="menu-item"
              >
                Login
              </div>
            </h1>*/}
            <h1>
              <div
                id="option-themes"
                onClick={this.showSettings.bind(this)}
                className="menu-item"
              >
                Themes 🖌
              </div>
            </h1>
            <h1>
              <div
                id="option-tips"
                onClick={this.toggleTips.bind(this)}
                className="menu-item"
              >
                Tips 💎
              </div>
            </h1>
            {/* <h1>
              <div id="option-learned-maps" className="menu-item">
                Learned Maps ✅
              </div>
            </h1>
            <h1>
              <div id="option-path-picker" className="menu-item">
                Path Picker 🗺
              </div>
            </h1> */}
          </Menu>
        );
      case 'option-tips':
        return (
          <Menu right width={340}>
            <h1>
              <div
                id="option-tips"
                onClick={this.toggleTips.bind(this)}
                className="menu-item"
              >
                Tips 💎
              </div>
            </h1>
            <div>
              <div>The path below the search bar shows where you are</div>
              <div>You can click on that path to go back to different maps</div>
              <div>
                Pressing return on the suggestion options in the search bar is a
                fun way to explore new maps
              </div>
              <div>
                Hovering over a node will display a note if that node has a note
              </div>
              <div>Help button is a great way to reference emoji meanings</div>
              <div>
                All basics nodes have steps like 1. 2. and so on, if nodes have
                the same step, just choose any you like
              </div>
              <div>
                Certain nodes have a prefix like 17: or 15: which stands for the
                year in which that article or video or paper was writen in
              </div>
              <div>
                Nearly all nodes have a reddit subreddit or stack exchange forum
                attached to them, they're a great place to ask questions you may
                have
              </div>
              <div>
                You can also join our{' '}
                <a href="https://knowledge-map.slack.com/shared_invite/MTgxNTYzMjIzNjM5LTE0OTQzMzA4MDAtYzY1YWY0ZDc0NQ">
                  community on Slack
                </a>{' '}
                to learn together and help the project evolve
              </div>
            </div>
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
                id="night"
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
