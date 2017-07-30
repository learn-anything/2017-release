import { Component } from 'react';
import { Provider } from 'react-redux';
import 'themes/_Night.sass';

/*
 * Needs Redux store as prop.
 */
export default class PathPicker extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <h1>Create a Path</h1>
          <h2>Help</h2>
        </div>
      </Provider>
    );
  }
}
