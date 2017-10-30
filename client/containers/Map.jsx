import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMap } from 'actions/Map';
import { showDialog } from 'actions/Dialog';
import { titleToURL } from 'utils/Title';
import Logo from 'components/Logo';
import SearchBar from 'components/SearchBar';
import Breadcrumbs from 'components/Breadcrumbs';
import MindMapWrapper from 'containers/MindMapWrapper';
import Legend from 'components/Legend';


@connect(store => ({ title: store.map.title }))
export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      legend: false,
    };

    this.showAbout = this.showAbout.bind(this);
    this.toggleLegend = this.toggleLegend.bind(this);
  }

  showAbout() {
    this.props.dispatch(showDialog(__('about')));
  }

  toggleLegend() {
    this.setState({ legend: !this.state.legend });
  }


  render() {
    return (
      <div>
        <header>
          <Logo />
          <SearchBar history={this.props.history} docked={true} />

          <Breadcrumbs title={this.props.title} />
        </header>

        <MindMapWrapper />

        <footer>
          <a onClick={this.showAbout}>About</a>
          <span className="footer-separator">-</span>
          <a
            onClick={this.toggleLegend}
            className={this.state.legend ? 'footer-highlight' : ''}>
            Legend
          </a>
        </footer>

        {this.state.legend && <Legend onClose={this.toggleLegend} />}
      </div>
    );
  }

  componentDidMount() {
    // Fetch map if it hasn't been fetched already
    if (titleToURL(this.props.title) !== this.props.match.url) {
      this.props.dispatch(fetchMap(this.props.match.url));
    }
  }

  componentDidUpdate() {
    // Fetch new map if it hasn't been fetched already
    if (titleToURL(this.props.title) !== this.props.match.url) {
      this.props.dispatch(fetchMap(this.props.match.url));
    }
  }
}
