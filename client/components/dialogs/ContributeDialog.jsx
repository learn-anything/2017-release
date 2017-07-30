import { Component } from 'react';
import openNewTab from 'utils/openNewTab';
import { cleanTitleToAbsURL } from 'utils/Title';
import 'sass/_ContributeDialog.sass';
import Dialog from './Dialog';

export default class ContributeDialog extends Component {
  constructor(props) {
    super(props);

    this.redirect = this.redirect.bind(this);
  }

  redirect() {
    const mapPath = cleanTitleToAbsURL(this.props.title);
    const url = `https://github.com/nikitavoloboev/learn-anything/edit/master${mapPath}.json`;

    openNewTab('Contribution', 'accept guidelines', url);
    this.props.onReject();
  }

  render() {
    if (!this.props.visible) {
      return null;
    }

    return (
      <Dialog
        title="Contribution guidelines"
        acceptLabel="Continue"
        isCentered={false}
        onReject={this.props.onReject}
        onAccept={this.redirect}
      >
        <div
          dangerouslySetInnerHTML={{ __html: __('contribution_guidelines') }}
          className="contribute-dialog" />
      </Dialog>
    );
  }
}

ContributeDialog.defaultProps = {
  onReject: () => {},
  visible: false,
  title: '',
};
