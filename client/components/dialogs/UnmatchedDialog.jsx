import React, { Component } from 'react';
import openNewTab from 'utils/openNewTab';
import actions from 'constants/actions.json';
import Dialog from './Dialog';

export default class UnmatchedDialog extends Component {
  constructor(props) {
    super(props);

    this.redirect = this.redirect.bind(this);
  }

  redirect() {
    const url = `https://duckduckgo.com/?q=${this.props.query}`;
    openNewTab({
      type: actions.ga.search.fallbackSearch,
      payload: url,
    });
    this.props.onReject();
  }

  render() {
    if (!this.props.visible) {
      return null;
    }

    return (
      <Dialog
        title={__('unmatched_dialog_title')}
        acceptLabel={__('unmatched_dialog_accept_label')}
        onReject={this.props.onReject}
        onAccept={this.redirect}
        acceptOnEnterPress={true}
      >
        <div className="unmatched-dialog">
          {__('unmatched_dialog_message')}
        </div>
      </Dialog>
    );
  }
}

UnmatchedDialog.defaultProps = {
  onReject: () => {},
  visible: false,
  query: '',
};
