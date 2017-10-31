import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hideLegend } from 'actions/Legend';
import 'sass/_Legend.sass';


@connect(store => ({
  isVisible: store.legend.isVisible,
}))
export default class Legend extends Component {
  onOverlayClick(event) {
    // If user clicked on the overlay (and not on the legend body)
    // then close the legend.
    if (event.target.className === 'la-legend-overlay') {
      this.props.dispatch(hideLegend());
    }
  }

  render() {
    if (!this.props.isVisible) {
      return null;
    }

    return (
      <div className="la-legend">
        <div className="la-legend-overlay" onClick={this.onOverlayClick.bind(this)}>
          <div className="la-legend-body" dangerouslySetInnerHTML={{ __html: __('legend') }} />
        </div>
      </div>
    );
  }
}
