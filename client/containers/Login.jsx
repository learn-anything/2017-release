import { Component } from 'react';
import { connect } from 'react-redux';

@connect(store => ({ issue: undefined }))
export default class ContributeButton extends Component {
  onClick() {
  }

  render() {
    return (<div></div>);
  }
}
