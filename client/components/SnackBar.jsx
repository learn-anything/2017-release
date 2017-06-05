import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import '../sass/_SnackBar.sass';

// Retrieve the message from the store, and set it as prop.
@connect(store => ({
  visible: store.message.visible,
  text: store.message.text,
}))
export default class SnackBar extends Component {
  timeToCome() {
    return (
      <div className={'snackbar-container--invisible'}>
        <div className="snackbar">
          {this.props.text}
        </div>
      </div>
    );
  }
  timeToGo() {
    return (
      <div className={'snackbar-container--visible'}>
        <div className="snackbar">
          {this.props.text}
        </div>
      </div>
    );
  }
  render() {
    // let className = 'snackbar-container';

    // If there's a message to show make the snackbar visible.
    if (!this.props.visible) {
      return;
      // this.timeToGo();
    }
    return this.timeToCome();
    // setTimeout(() => this.timeToGo(), 500);
    
  }

}

SnackBar.proptypes = {
  visible: PropTypes.bool,
  text: PropTypes.string,
};
