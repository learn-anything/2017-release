import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMap } from 'actions/Map';
import { showDialog } from 'actions/Dialog';
import { showLegend } from 'actions/Legend';
import { titleToURL } from 'utils/Title';
import Logo from 'components/Logo';
import SearchBar from 'components/SearchBar';
import Breadcrumbs from 'components/Breadcrumbs';
import ContributeButton from 'components/ContributeButton';
import Map from 'components/map/Map';
import 'sass/_Map.sass';


@connect(store => ({ title: store.map.title }))
export default class MapPage extends Component {
  constructor(props) {
    super(props);

    this.showAbout = this.showAbout.bind(this);
    this.showLegend = this.showLegend.bind(this);
  }

  showAbout() {
    this.props.dispatch(showDialog(__('about')));
  }

  showLegend() {
    this.props.dispatch(showLegend());
  }


  render() {
    return (
      <div>
        <header>
          <div>
            <Logo />
            <SearchBar history={this.props.history} docked={true} />

            <Breadcrumbs />
            <ContributeButton />
          </div>
        </header>

        <Map />

        <footer>
          <a onClick={this.showAbout}>About</a>
          <span className="footer-separator">-</span>
          <a onClick={this.showLegend}>Legend</a>
        </footer>
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
