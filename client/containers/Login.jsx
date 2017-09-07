import { Component } from 'react';
import { connect } from 'react-redux';
import 'sass/_ContributeButton.sass';

@connect(store => ({ issue: undefined }))
export default class ContributeButton extends Component {
  onClick() {
    setTimeout(() => { location.href = this.props.issue; }, 500);

    ga('send', 'event', {
      eventCategory: 'Coontribution',
      eventAction: 'contribution button clicked',
      eventLabel: this.props.issue,
      hitCallback: () => { location.href = this.props.issue; },
    });
  }

  render() {
    if (this.props.issue) {
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
