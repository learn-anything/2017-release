import { Component } from 'react';
import 'sass/_Dialog.sass';


export default class Dialog extends Component {
  constructor(props) {
    super(props);

    this.reject = this.reject.bind(this);
  }

  reject(event) {
    // Click outside dialog
    if (event.target.className === 'dialog-container') {
      this.props.onReject();
    }
  }

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
    let className = 'dialog-container';

    if (this.props.isVerticallyCentered) {
      className += ' dialog-container--centered';
    }

    return (
      <div className={className} onClick={this.reject}>
        <div className="dialog">
          <div className="dialog-title">{this.props.title}</div>
          <div className="dialog-body">{this.props.children}</div>
          {this.props.hasFooter ? this.renderFooter() : ''}
        </div>
      </div>
    );
  }

  componentDidMount() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && this.props.acceptOnEnterPress) {
        this.props.onAccept();
      }

      if (event.key === 'Escape') {
        this.props.onReject();
      }
    });
  }
}

Dialog.defaultProps = {
  title: '',
  hasFooter: true,
  isCentered: true,

  rejectLabel: 'Cancel',
  onReject: () => {},

  acceptLabel: 'Okay',
  onAccept: () => {},
  acceptOnEnterPress: false,
};
