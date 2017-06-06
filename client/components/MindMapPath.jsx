import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import '../sass/_MindMapPath.sass';

@connect(store => ({
  path: store.currentUrl,
}))
export default class MindMapPath extends Component {
  render() {
    let path = this.props.path;
    // eslint-disable-next-line no-useless-escape
    path = path.replace(/https?:\/\/[^\/]*\//, '');
    path = path.split('/');
    path = path.map((el, index) => (
      <a href={`/${path.slice(0, index + 1).join('/')}`}>
        <span>{el.replace(/_/g, ' ')}</span>
      </a>
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
