import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Logo from 'components/Logo';
import SearchBar from 'components/SearchBar';

@connect(store => ({
  title: store.map.title,
  query: store.search.query,
}))
export default class Home extends Component {
  render() {
    return (
      <div>
        <Logo big={true} welcome={this.props.query === ''} />

        <h1 className="la-title">{__('first_search_title')}</h1>
        <SearchBar history={this.props.history} />

        <p className="helpText">
          {__('searchbar_help_text_0')}<br/>
          {__('searchbar_help_text_1')}
          <Link to="/learn-anything">{__('searchbar_help_text_anything')}</Link>
        </p>

        {/* TotalSearches */}
      </div>
    );
  }
}
