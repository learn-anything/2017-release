import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from './Dialog.jsx';
import { hideUnmatched } from '../../actions/dialogs';
import openNewTab from '../../utils/openNewTab';

@connect(store => store.dialogs.unmatched)
export default class UnmatchedDialog extends Component {
  redirect() {
    const url = `https://duckduckgo.com/?q=${this.props.query}`;
    openNewTab('Search', 'fallback search', url);
  }

  reject() {
    this.props.dispatch(hideUnmatched());
  }

  render() {
    if (!this.props.visible) {
      return null;
    }

    return (
      <Dialog
        title="Unmatched query"
        accept="Search"
        onReject={this.reject.bind(this)}
        onAccept={this.redirect.bind(this)}
        acceptOnEnter={true}
        className="unmatched-dialog"
      >
        The topic you're looking for doesn't have a map yet, but
        you can search it on DuckDuckGo.
      </Dialog>
    );
  }
}
