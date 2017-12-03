import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import GithubCorner from 'react-github-corner';

import Logo from 'components/Logo';
import SearchBar from 'components/SearchBar';
import queries from 'constants/media-queries.json';
import 'sass/_Home.sass';


@connect(store => ({
  title: store.map.title,
  query: store.search.query,
}))
export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Logo big={true} welcome={this.props.query === ''} />

        <MediaQuery minWidth={queries.xs}>
          <GithubCorner
            href="https://github.com/learn-anything/learn-anything"
            bannerColor="#fff"
            octoColor="#222324"
            size={80}
            direction="left"
          />
        </MediaQuery>

        <h1 className="title">{__('first_search_title')}</h1>
        <SearchBar history={this.props.history} />

        <div className="help-text">
          <p>
            {__('searchbar_help_text_0')}<br/>
            {/* {__('searchbar_help_text_1')}
            <Link to="/learn-anything">{__('searchbar_help_text_anything')}</Link> */}
          </p>
        </div>

        {/* TotalContributions */}
      </div>
    );
  }
}
