import { render } from 'react-dom';

import SearchBar from './components/SearchBar.jsx';
import SnackBar from './components/SnackBar.jsx';
import Observable from './utils/Observable';
import './sass/main.sass';

const message = new Observable('');

window.onload = () => {
  render(
    <div>
      <SearchBar message={message} />
      <SnackBar message={message} />
    </div>,
    document.getElementById('react-app'),
  );
};
