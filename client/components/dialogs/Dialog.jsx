import React, { Component } from 'react';
import classNames from 'utils/classNames';
import 'sass/_Dialog.sass';

// Generic dialog.
export default class Dialog extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onKeydown = this.onKeydown.bind(this);
  }

  // When clicking outside dialog trigger onReject.
  onClick(event) {
    if (event.target.className.includes('dialog-container')) {
      this.props.onReject();
    }
  }

  onKeydown(event) {
    if (event.key === 'Enter' && this.props.acceptOnEnterPress) {
      this.props.onAccept();
    }

    if (event.key === 'Escape') {
      this.props.onReject();
    }
  }

  // Render footer with Reject and Accept buttons.
  renderFooter() {
    return (
      <div className="dialog-footer">
        <a className="dialog-footer--reject" onClick={this.props.onReject}>
          {this.props.rejectLabel}
        </a>

        <a className="dialog-footer--accept" onClick={this.props.onAccept}>
          {this.props.acceptLabel}
        </a>
      </div>
    );
  }

  render() {
    const className = classNames({
      'dialog-container': true,
      'dialog-container--centered': this.props.isCentered,
    });

    return (
      <div className={className} onClick={this.onClick}>
        <div className="dialog">
          <div className="dialog-title">{this.props.title}</div>
          <div className="dialog-body">{this.props.children}</div>
          {this.props.hasFooter ? this.renderFooter() : ''}
        </div>
      </div>
    );
  }

  // Listen for Enter or Escape keypresses.
  componentDidMount() {
    document.onkeydown = this.onKeydown;
  }
}

Dialog.defaultProps = {
  title: '',
  hasFooter: true,
  isCentered: true,

  rejectLabel: __('dialog_cancel'),
  onReject: () => {},

  acceptLabel: __('dialog_okay'),
  onAccept: () => {},
  acceptOnEnterPress: false,
};
