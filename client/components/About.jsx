import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'sass/_About.sass';

export default class About extends Component {
  onOverlayClick(event) {
    console.log(event.target);
    if (event.target.className === 'la-about-overlay') {
      this.props.onClose();
    }
  }

  render() {
    return (
      <div className="la-about">
        <div className="la-about-overlay" onClick={this.onOverlayClick.bind(this)}>
          <button className="la-about-close" onClick={this.props.onClose}>&#x2715;</button>
          <div className="la-about-body" dangerouslySetInnerHTML={{ __html: __('about') }} />
        </div>
      </div>
    );
  }
}

About.propTypes = {
  onClose: PropTypes.func,
};

About.defaultProps = {
  onClose: () => {},
};
