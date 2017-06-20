import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import '../sass/_MindMapPath.sass';
import fetchMap from '../actions/fetchMap';
import { clearQuery } from '../actions/Search';

@connect(store => ({
  path: store.currentUrl,
}))
export default class MindMapPath extends Component {
  dispatch() {
    const url = this.path.slice(0, this.index + 1).join('/');
    this.props.dispatch(fetchMap(url));
    this.props.dispatch(clearQuery());
    ga('send', 'pageview', `/${url}`);
  }
  render() {
    let path = this.props.path;
    // eslint-disable-next-line no-useless-escape
    path = path.replace(/https?:\/\/[^\/]*\//, '');
    path = path.split('/');
    path = path.map((el, index) => (
      <span onClick={this.dispatch.bind({ ...this, path, index })}>{el.replace(/-/g, ' ')}</span>
    ));

    return (
      <div className="mind-map-path">
        {path}
      </div>
    );
  }
}

MindMapPath.propTypes = {
  path: PropTypes.string,
};
