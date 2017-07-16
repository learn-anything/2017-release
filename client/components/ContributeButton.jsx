import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import '../sass/_ContributeButton.sass';

@connect(store => ({ url: store.map.url }))
export default class ContributeButton extends Component {
  onClick() {
    const windowRef = window.open();
    const template = (url) => {
      let path = `${url}.json`;

      if (path !== '/learn-anything.json') {
        path = `/learn-anything${path}`;
      }

      return `https://github.com/nikitavoloboev/learn-anything/edit/master${path}`
    };

    ga('send', 'event', {
      eventCategory: 'Contribution',
      eventAction: 'contribute button clicked',
      eventLabel: this.props.url,
    });

    windowRef.location = template(this.props.url);
    windowRef.focus();
  }

  render() {
    if (this.props.url) {
      return (
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
      );
    }

    return (<div></div>);
  }
}
