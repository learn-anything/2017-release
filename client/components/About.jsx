import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'sass/_About.sass';

@connect(store => ({ visible: store.dialogs.about }))
export default class About extends Component {
  render() {
    if (!this.props.visible) {
      return null;
    }

    return (
      <div className="la-about">
        <div className="la-about-overlay"></div>
        <div className="la-about-body" dangerouslySetInnerHTML={{ __html: __('about') }} />
      </div>
    );
  }
}
