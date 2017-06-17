import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import '../sass/_SnackBar.sass';

// Retrieve the message from the store, and set it as prop.
@connect(store => ({
  visible: store.message.visible,
  text: store.message.text,
}))
export default class SnackBar extends Component {
  render() {
    const className = `snackbar-container snackbar-container--${this.props.visible}`;

    return (
      <div className={className}>
        <div className="snackbar">
          {this.props.text}
        </div>
      </div>
    );
  }
}

SnackBar.proptypes = {
  visible: PropTypes.string,
  text: PropTypes.string,
};
