import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMap, clearVotes, fetchVotes } from 'actions/Map';
import { showDialog } from 'actions/Dialog';
import { showLegend } from 'actions/Legend';
import { titleToURL } from 'utils/Title';
import Logo from 'components/Logo';
import SearchBar from 'components/SearchBar';
import Breadcrumbs from 'components/Breadcrumbs';
import ContributeButton from 'components/ContributeButton';
import Map from 'components/map/Map';
import 'sass/_Map.sass';


@connect(store => ({
  title: store.map.title,
  mapID: store.map.mapID,
  fetchedVotes: store.map.fetchedVotes,
}))
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
    const titlePath = titleToURL(this.props.title);
    const mapIDPath = `/${this.props.mapID}`;

    // Strip URL parameters and trailing slash.
    const match = this.props.match.url.replace(/\/$|\/?\?.*/, '');

    // Fetch map if it hasn't been fetched already.
    if (titlePath !== match && mapIDPath !== this.props.match.url) {
      this.props.dispatch(fetchMap(this.props.match.url));
      this.props.dispatch(clearVotes());
    } else if (this.props.mapID && !this.props.fetchedVotes) {
      this.props.dispatch(fetchVotes(this.props.mapID));
    }
  }

  componentDidUpdate() {
    const titlePath = titleToURL(this.props.title);
    const mapIDPath = `/${this.props.mapID}`;

    // Strip URL parameters and trailing slash.
    const match = this.props.match.url.replace(/\/$|\/?\?.*/, '');

    // Fetch new map if it hasn't been fetched already.
    if (titlePath !== match && mapIDPath !== this.props.match.url) {
      this.props.dispatch(fetchMap(this.props.match.url));
      this.props.dispatch(clearVotes());
    } else if (this.props.mapID && !this.props.fetchedVotes) {
      this.props.dispatch(fetchVotes(this.props.mapID));
    }
  }
}
