import { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { connect } from 'react-redux';
import setTheme from '../actions/setTheme';
import '../sass/_Sidebar.sass';

@connect(store => ({ theme: store.theme }))
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
            Themes 🖌
          </div>
          <div className="sidebar-menu-options">
            <div onClick={this.changeTheme} data-theme="Grey">
              Night 🌃
            </div>
            <div onClick={this.changeTheme} data-theme="PearlWhite">
              Pearl white ⚪
            </div>
          </div>
        </div>

        <div className="sidebar-menu-block">
          <div onClick={this.toggleVisibility} className="sidebar-menu-item">
            Tips 💎
          </div>
          <div className="sidebar-menu-options">
            <div disabled>
              The path below the search bar shows where you are
            </div>
            <div disabled>
              You can click on that path to go back to different maps
            </div>
            {/*<div disabled>
                Pressing return on the suggestion options in the search bar is a
                fun way to explore new maps
              </div>*/}
            <div disabled>
              Hovering over a node will display a note if it exists
            </div>
            <div disabled>
              Help button or hovering over emojis is a great way to get their
              meanings
            </div>
            <div disabled>
              All basics nodes have steps like 1. 2. and so on, if nodes have
              the same step, just choose any you like
            </div>
            <div disabled>
              Certain nodes have a prefix like 17: or 15: which stands for the
              year in which that article or video or paper was writen in
            </div>
            <div disabled>
              Searching 'anything' or 'everything' will show you the main map.
            </div>
            <div disabled>
              Nearly all main nodes have a reddit subreddit or stack exchange
              forum attached to them, they're a great place to ask questions you
              may have
            </div>
            <div disabled>
              You can also join our&nbsp;
              <a href="https://knowledge-map.slack.com/shared_invite/MTgxNTYzMjIzNjM5LTE0OTQzMzA4MDAtYzY1YWY0ZDc0NQ">
                community on Slack
              </a>
              &nbsp;to learn together and help the project evolve
            </div>
          </div>
        </div>
      </Menu>
    );
  }
}
