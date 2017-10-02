import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'sass/_Legend.sass';

export default class Legend extends Component {
  onOverlayClick(event) {
    console.log(event.target);
    if (event.target.className === 'la-legend-overlay') {
      this.props.onClose();
    }
  }

  render() {
    return (
      <div className="la-legend">
        <div className="la-legend-overlay" onClick={this.onOverlayClick.bind(this)}>
          <div className="la-legend-body" dangerouslySetInnerHTML={{ __html: __('legend') }} />
        </div>
      </div>
    );
  }
}

Legend.propTypes = {
  onClose: PropTypes.func,
};

Legend.defaultProps = {
  onClose: () => {},
};
