import { Component } from 'react';
import { connect } from 'react-redux';
import 'sass/_ContributeButton.sass';
import ContributeDialog from './dialogs/ContributeDialog';

@connect(store => ({ title: store.map.title }))
export default class ContributeButton extends Component {
  constructor(props) {
    super(props);

    this.state = { contributeDialog: false };

    this.showDialog = this.showDialog.bind(this);
    this.dismissDialog = this.dismissDialog.bind(this);
  }

  showDialog() {
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
          <span className="contribute-button-text">Improve this map</span>
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
