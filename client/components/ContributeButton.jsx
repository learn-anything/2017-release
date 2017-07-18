import { Component } from 'react';
import { connect } from 'react-redux';
import { showContribute } from '../actions/dialogs';
import ContributeDialog from './dialogs/ContributeDialog.jsx';
import '../sass/_ContributeButton.sass';

@connect(store => ({ url: store.map.url }))
export default class ContributeButton extends Component {
  onClick() {
    const template = (url) => {
      let path = `${url}.json`;

      if (path !== '/learn-anything.json') {
        path = `/learn-anything${path}`;
      }

      return `https://github.com/nikitavoloboev/learn-anything/edit/master${path}`;
    };

    this.props.dispatch(showContribute(template(this.props.url)));
  }

  render() {
    if (this.props.url) {
      return (
        <div>
          <button
            onClick={this.onClick.bind(this)}
            className="contribute-button"
            type="button"
          >
            <span className="contribute-button-text">Improve this map</span>
            <img
              className="contribute-button-emoji"
              src="https://assets-cdn.github.com/images/icons/emoji/unicode/1f984.png"
            />
          </button>
          <ContributeDialog />
        </div>
      );
    }

    return (<div></div>);
  }
}
