import React, { Component } from 'react';
import 'sass/_ContributeButton.sass';

export default class ContributeButton extends Component {
  render() {
    return (
      <div>
        <button className="contribute-button" type="button">
          <span className="contribute-button-text">{__('contribute_button_text')}</span>
        </button>
      </div>
    );
  }
}
