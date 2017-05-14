import { Component, PropTypes } from 'react';

import '../sass/_SnackBar.sass';


export default class SnackBar extends Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };

    this.props.message.on('data', ({ value }) => {
      if (value) {
        setTimeout(() => this.props.message.set(''), 2500);
      }

      this.setState({ message: value });
    });
  }

  render() {
    const className = `snackbar-container ${this.state.message !== '' ? 'visible' : ''}`;

    return (
      <div className={className}>
        <div className="snackbar" ref={(snackBar) => { this.snackBar = snackBar; }}>
          {this.state.message}
        </div>
      </div>
    );
  }
}

SnackBar.propTypes = {
  message: PropTypes.object.isRequired,
};
