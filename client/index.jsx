import { render } from 'react-dom';

import SearchBar from './components/SearchBar.jsx';
import './sass/main.sass';

window.onload = () => {
  render(<SearchBar />, document.getElementById('react-app'));
};
