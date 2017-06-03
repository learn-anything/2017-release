import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(store => ({
  issue: store.map.issueUrl
}))



export default class ContributeButton extends Component {
  render() {
    function onClick() {
     window.location.href = this.props.issue;
    }
    return (
      <button className="contribute-button" type="button" onClick={this.onClick.bind(this)}>
        Improve it 🦄
      </button>
    );
  }
}

ContributeButton.propTypes = {
  issue: PropTypes.string,
};
