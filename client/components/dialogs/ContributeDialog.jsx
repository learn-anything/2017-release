import React, { Component } from 'react';
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
    const mapPath = cleanTitleToAbsURL(this.props.mapTitle);
    const url = `https://github.com/nikitavoloboev/learn-anything/edit/master${mapPath}.json`;

    openNewTab('Contribution', 'accept guidelines', url);
  }

  render() {
    if (!this.props.visible) {
      return null;
    }

    return (
      <Dialog
        title={__('contribute_dialog_title')}
        acceptLabel={__('contribute_dialog_accept_label')}
        isCentered={false}
        onReject={this.props.onReject}
        onAccept={this.redirect}
      >
        <div
          dangerouslySetInnerHTML={{ __html: __('contribute_dialog_message') }}
          className="contribute-dialog" />
      </Dialog>
    );
  }
}

ContributeDialog.defaultProps = {
  onReject: () => {},
  visible: false,
  mapTitle: '',
};
