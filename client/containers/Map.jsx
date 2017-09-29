import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchMap from 'actions/fetchMap';
import { titleToURL } from 'utils/Title';
import Logo from 'components/Logo';
import SearchBar from 'components/SearchBar';
import Breadcrumbs from 'components/Breadcrumbs';
import MindMapWrapper from 'containers/MindMapWrapper';
import About from 'components/About';
import { setAboutVisibility, setLegendVisibility } from 'actions/Dialogs';


@connect(store => ({ title: store.map.title }))
export default class Map extends Component {
  constructor(props) {
    super(props);

    this.onAboutClick = this.onAboutClick.bind(this);
    this.onLegendClick = this.onLegendClick.bind(this);
  }

  onAboutClick() {
    this.props.dispatch(setAboutVisibility(true));
  }

  onLegendClick() {
    this.props.dispatch(setLegendVisibility(true));
  }

  render() {
    // Fetch map if it hasn't been fetched already
    if (titleToURL(this.props.title) !== this.props.match.url) {
      this.props.dispatch(fetchMap(this.props.match.url));
    }

    return (
      <div>
        <header>
          <Logo />
          <SearchBar history={this.props.history} docked={true} />

          <Breadcrumbs title={this.props.title} />
        </header>

        <MindMapWrapper />

        <footer>
          <a onClick={this.onAboutClick}>About</a>
          <span className="footer-separator">-</span>
          <a onClick={this.onLegendClick}>Legend</a>
        </footer>

        <About />
      </div>
    );
  }
}
