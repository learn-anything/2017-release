import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import Autosuggest from 'react-autosuggest';

import classNames from 'utils/classNames';
import { showSearchbar, hideSearchbar } from 'actions/Header';
import { fetchSuggestions, clearSuggestions, updateQuery, clearQuery } from 'actions/Search';
import actions from 'constants/actions.json';
import queries from 'constants/media-queries.json';
import 'sass/_SearchBar.sass';


// Functions for react-autosuggest component.
const renderSuggestion = ({ id, key }) => (
  <Link to={`/${id}`} className="searchbar-suggestion">
    <span className="searchbar-suggestion-key">{key}</span>
  </Link>
);
const getSuggestionValue = suggestion => suggestion.key;


@connect(store => ({
  title: store.map.title,
  query: store.search.query,
  suggestions: store.search.suggestions,
  placeholder: store.search.placeholder,
  loading: store.search.loading,
  isVisible: store.header.searchbar,
}))
export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    // Bind component methods.
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.renderSuggestionsContainer = this.renderSuggestionsContainer.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.renderSearchBar = this.renderSearchBar.bind(this);
  }

  toggleVisibility() {
    if (this.props.isVisible) {
      this.props.dispatch(hideSearchbar());
    } else {
      this.props.dispatch(showSearchbar());
    }
  }

  onInputChange(event) {
    this.props.dispatch(updateQuery(event.target.value));
  }

  renderSuggestionsContainer({ containerProps, children }) {
    return (
      <div {...containerProps} className="searchbar-suggestions-container">
        { this.props.docked ?
          <div className="searchbar-suggestions-title">
            {__('searchbar_suggestions_title')}
          </div> : ''
        }
        {children}
      </div>
    );
  }

  onFormSubmit(event) {
    // Prevent from submitting form.
    event.preventDefault();

    // You haven't written anything; If you're in the home page
    // fetch random map indicated on placeholder and get new placeholder,
    // otherwise, do nothing.
    if (this.props.query === '') {
      if (!this.props.docked) {
        this.props.history.push(this.props.placeholder.title);
        this.props.dispatch(fetchSuggestions());
      }
      return;
    }

    // There's no suggestion for what you're searching; show unmatched dialog.
    // TODO - ensure that there's no suggestions (sometimes they just haven't
    // finished loading).
    // TODO - update unmatched dialog.
    if (this.props.suggestions.length === 0) {
      this.props.dispatch({
        type: actions.ga.search.unmatchedQuery,
        payload: this.props.query,
      });
      document.activeElement.blur();
    }
  }

  onSuggestionSelected(event, { suggestion }) {
    // Prevent from submitting form if suggestion is
    // selected pressing enter.
    event.preventDefault();

    // Navigate to map and clear search query.
    this.props.history.push(suggestion.title);
    this.props.dispatch(clearQuery());

    // On mobile hide the searchbar after you selected a suggestion.
    if (this.props.isVisible) {
      this.props.dispatch(hideSearchbar());
    }
  }

  onSuggestionsFetchRequested({ value }) {
    this.props.dispatch(fetchSuggestions(value));
  }

  onSuggestionsClearRequested() {
    this.props.dispatch(clearSuggestions());
  }

  renderSearchBar() {
    const inputClassName = classNames({
      'searchbar-input': true,
      'searchbar-input--docked': this.props.docked,
    });

    // Props for input field on autosuggest.
    const inputProps = {
      autoFocus: true,
      className: inputClassName,
      value: this.props.query,
      onChange: this.onInputChange,
      placeholder: `e.g. ${this.props.placeholder.key}`,
    };

    if (this.props.docked) {
      inputProps.placeholder = __('searchbar_new_search');
    }

    return (
      <Autosuggest
        inputProps={inputProps}
        renderSuggestion={renderSuggestion}
        highlightFirstSuggestion={true}
        suggestions={this.props.suggestions}
        getSuggestionValue={getSuggestionValue}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
      />
    );
  }

  render() {
    const formClassName = classNames({
      'searchbar-container': true,
      'searchbar-container--docked': this.props.docked,
    });

    if (!this.props.docked) {
      return (
        <form className={formClassName} onSubmit={this.onFormSubmit}>
          {this.renderSearchBar()}
        </form>
      );
    }

    return (
      <form className={formClassName} onSubmit={this.onFormSubmit}>
        <MediaQuery maxWidth={queries.s}>
          {!this.props.isVisible &&
            <button className="searchbar-btn-show" onClick={this.toggleVisibility}>
              <img src="/static/icons/search.svg"></img>
            </button>
          }

          {this.props.isVisible &&
            <div>
              {this.renderSearchBar()}

              <button className="searchbar-btn-hide" onClick={this.toggleVisibility}>
                &#x2715;
              </button>
            </div>
          }
        </MediaQuery>

        <MediaQuery minWidth={queries.s + 1}>
          {this.renderSearchBar()}
        </MediaQuery>
      </form>
    );
  }

  componentDidMount() {
    // If there's no placeholder and the user is on the home page (searchbar
    // is not docked), fetch it.
    if (this.props.placeholder.id === '' && !this.props.docked) {
      this.props.dispatch(fetchSuggestions());
    }
  }
}

SearchBar.defaultProps = {
  docked: false,
  history: {},
};
