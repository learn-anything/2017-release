import React, { Component } from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';

import queries from 'constants/media-queries.json';
import { hideLegend } from 'actions/Legend';
import 'sass/_Legend.sass';


@connect(store => ({
  isVisible: store.legend.isVisible,
}))
export default class Legend extends Component {
  constructor(props) {
    super(props);

    this.hideLegend = this.hideLegend.bind(this);
    this.onOverlayClick = this.onOverlayClick.bind(this);
  }

  hideLegend() {
    this.props.dispatch(hideLegend());
  }

  onOverlayClick(event) {
    // If user clicked on the overlay (and not on the legend body)
    // then close the legend.
    if (event.target.className === 'legend-overlay') {
      this.hideLegend();
    }
  }

  render() {
    if (!this.props.isVisible) {
      return null;
    }

    return (
      <div className="legend">
        <div className="legend-overlay" onClick={this.onOverlayClick}>
          <MediaQuery maxWidth={queries.s}>
            <div className="legend-header">
              <div className="legend-title">{__('legend_title')}</div>
              <button
                className="legend-close"
                onClick={this.hideLegend}
              >
                &#x2715;
              </button>
            </div>
          </MediaQuery>

          <div className="legend-body" dangerouslySetInnerHTML={{ __html: __('legend') }} />
        </div>
      </div>
    );
  }
}
