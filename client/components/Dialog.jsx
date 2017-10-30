import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hideDialog } from 'actions/Dialog';
import 'sass/_Dialog.sass';


@connect(store => ({
  isVisible: store.dialog.isVisible,
  content: store.dialog.content,
}))
export default class Dialog extends Component {
  constructor(props) {
    super(props);

    this.onOverlayClick = this.onOverlayClick.bind(this);
    this.hide = this.hide.bind(this);
  }

  hide() {
    this.props.dispatch(hideDialog());
  }

  onOverlayClick(event) {
    // If user clicked on the overlay (and not on the dialog body)
    // then close the dialog.
    if (event.target.className === 'la-dialog-overlay') {
      this.hide();
    }
  }

  render() {
    const { content, isVisible } = this.props;

    if (!isVisible) {
      return null;
    }

    return (
      <div className="la-dialog">
        <div className="la-dialog-overlay" onClick={this.onOverlayClick}>
          <button className="la-dialog-hide" onClick={this.hide}>
            &#x2715;
          </button>

          <div
            className="la-dialog-body"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    );
  }
}
