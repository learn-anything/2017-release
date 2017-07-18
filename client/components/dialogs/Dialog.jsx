import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../sass/_Dialog.sass';

// Retrieve the message from the store, and set it as prop.
export default class Dialog extends Component {
  dismiss(event) {
    if (event.target.className === 'dialog-container') {
      this.props.onReject();
    }
  }

  onKeyDown(event) {
    if (event.key === 'Enter' && this.props.acceptOnEnter) {
      this.props.onAccept();
    }

    if (event.key === 'Escape') {
      this.props.onReject();
    }
  }

  render() {
    let className = 'dialog-container';

    if (this.props.centered) {
      className += ' dialog-container--centered';
    }

    return (
      <div className={className} onClick={this.dismiss.bind(this)}>
        <input autoFocus={true} onKeyDown={this.onKeyDown.bind(this)} />
        <div className="dialog">
          {
            this.props.title ?
            <div className="dialog-title">
              {this.props.title}
            </div>: ''
          }
          <div className="dialog-body">
            {this.props.children}
          </div>
          {
            this.props.footer ?
            <div className="dialog-footer">
              <a className="dialog-footer--reject"
                onClick={this.props.onReject}>
                {this.props.reject}
              </a>
              <a className="dialog-footer--accept"
                onClick={this.props.onAccept}>
                {this.props.accept}
              </a>
            </div>: ''
          }
        </div>
      </div>
    );
  }
}

Dialog.defaultProps = {
  title: '',
  footer: true,
  centered: true,
  reject: 'Cancel',
  accept: 'Okay',
  onReject: () => console.log('Dialog.onReject triggered'),
  onAccept: () => console.log('Dialog.onAccept triggered'),
  acceptOnEnter: false,
};
