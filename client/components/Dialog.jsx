import React, { Component } from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';

import queries from 'constants/media-queries.json';
import { hideDialog } from 'actions/Dialog';
import 'sass/_Dialog.sass';


@connect(store => ({
  isVisible: store.dialog.isVisible,
  closeButton: store.dialog.closeButton,
  content: store.dialog.content,
  isJsx: store.dialog.isJsx,
  overlayDismiss: store.dialog.overlayDismiss,
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
    if (event.target.className === 'dialog-overlay' && this.props.overlayDismiss) {
      this.hide();
    }
  }

  render() {
    const { content, isVisible, isJsx } = this.props;

    if (!isVisible) {
      return null;
    }

    return (
      <div className="dialog">
        <div className="dialog-overlay" onClick={this.onOverlayClick}>
          <MediaQuery minWidth={queries.s}>
            {this.props.closeButton &&
              <button className="dialog-hide" onClick={this.hide}>
                &#x2715;
              </button>
            }
          </MediaQuery>

          {isJsx ?
            content
            :
            <div
              className="dialog-body"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          }
        </div>
      </div>
    );
  }
}
