import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

import 'sass/_Sidebar.sass';


export default function Sidebar() {
  // home, support, about, github, night mode
  return (
    <Menu className="sidebar-menu" width={250} right>
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
