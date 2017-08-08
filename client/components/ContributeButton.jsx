import React, { Component } from 'react';
import 'sass/_ContributeButton.sass';
import store from 'store/store';
import actions from 'constants/actions.json';
import ContributeDialog from './dialogs/ContributeDialog';

export default class ContributeButton extends Component {
  constructor(props) {
    super(props);
    this.state = { contributeDialog: false };

    this.showDialog = this.showDialog.bind(this);
    this.dismissDialog = this.dismissDialog.bind(this);
  }

  showDialog() {
    store.dispatch({
      type: actions.ga.contribution.buttonClicked,
      payload: this.props.title,
    });
    this.setState({ contributeDialog: true });
  }

  dismissDialog() {
    this.setState({ contributeDialog: false });
  }

  render() {
    if (!this.props.title) {
      return null;
    }

    return (
      <div>
        <button
          onClick={this.showDialog}
          className="contribute-button"
          type="button"
        >
          <span className="contribute-button-text">{__('contribute_button_text')}</span>
          <img className="contribute-button-emoji"
            src="https://assets-cdn.github.com/images/icons/emoji/unicode/1f984.png" />
        </button>

        <ContributeDialog
          onReject={this.dismissDialog}
          visible={this.state.contributeDialog}
          title={this.props.title}
        />
      </div>
    );
  }
}

ContributeButton.defaultProps = {
  title: '',
};
