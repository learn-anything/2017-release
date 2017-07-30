import { Component } from 'react';
import openNewTab from 'utils/openNewTab';
import Dialog from './Dialog';

export default class UnmatchedDialog extends Component {
  constructor(props) {
    super(props);

    this.redirect = this.redirect.bind(this);
  }

  redirect() {
    const url = `https://duckduckgo.com/?q=${this.props.query}`;
    openNewTab('Search', 'fallback search', url);
    this.props.onReject();
  }

  render() {
    if (!this.props.visible) {
      return null;
    }

    return (
      <Dialog
        title="Map not found"
        acceptLabel="Search"
        onReject={this.props.onReject}
        onAccept={this.redirect}
        acceptOnEnter={true}
        className="unmatched-dialog"
      >
        The topic you're looking for doesn't have a map yet, but you
        can search it on DuckDuckGo.
      </Dialog>
    );
  }
}

UnmatchedDialog.defaultProps = {
  onReject: () => {},
  visible: false,
  query: '',
};
