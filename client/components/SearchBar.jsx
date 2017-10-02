import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';

import UnmatchedDialog from 'components/dialogs/UnmatchedDialog';
import classNames from 'utils/classNames';
import { fetchSuggestions, clearSuggestions, updateQuery, clearQuery } from 'actions/Search';
import actions from 'constants/actions.json';
import 'sass/_SearchBar.sass';


// Functions for react-autosuggest component.
const renderSuggestion = ({ id, key, nodesCount }) => (
  <Link to={`/${id}`} className="searchbar-suggestion">
    <span className="searchbar-suggestion-key">{key}</span>
    <span className="searchbar-suggestion-nodes-count">{nodesCount} {__('searchbar_nodes_count')}</span>
  </Link>
);
const getSuggestionValue = suggestion => suggestion.key;


@connect(store => ({
  title: store.map.title,
  query: store.search.query,
  suggestions: store.search.suggestions,
  placeholder: store.search.placeholder,
  loading: store.search.loading,
}))
export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { unmatchedDialog: false };

    // Bind component methods.
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.dismissUnmatchedDialog = this.dismissUnmatchedDialog.bind(this);
    this.renderSuggestionsContainer = this.renderSuggestionsContainer.bind(this);
  }

  dismissUnmatchedDialog() {
    this.setState({ unmatchedDialog: false });
    this.props.dispatch(clearQuery());
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
        this.props.history.push(`/${this.props.placeholder.id}`);
        this.props.dispatch(fetchSuggestions());
      }
      return;
    }

    // There's no suggestion for what you're searching; show unmatched dialog.
    // TODO - ensure that there's no suggestions (sometimes they just haven't
    // finished loading).
    if (this.props.suggestions.length === 0) {
      this.props.dispatch({
        type: actions.ga.search.unmatchedQuery,
        payload: this.props.query,
      });
      this.setState({ unmatchedDialog: true });
      document.activeElement.blur();
    }
  }

  onSuggestionSelected(event, { suggestion }) {
    // Prevent from submitting form if suggestion is
    // selected pressing enter.
    event.preventDefault();

    // Navigate to map and clear search query.
    this.props.history.push(`/${suggestion.id}`);
    this.props.dispatch(clearQuery());
  }

  onSuggestionsFetchRequested({ value }) {
    this.props.dispatch(fetchSuggestions(value));
  }

  onSuggestionsClearRequested() {
    this.props.dispatch(clearSuggestions());
  }

  render() {
    const inputClassName = classNames({
      'searchbar-input': true,
      'searchbar-input--docked': this.props.docked,
    });

    const formClassName = classNames({
      'searchbar-container': true,
      'searchbar-container--docked': this.props.docked,
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
      <form className={formClassName} onSubmit={this.onFormSubmit}>
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


        <UnmatchedDialog
          onReject={this.dismissUnmatchedDialog}
          visible={this.state.unmatchedDialog}
          query={this.props.query}
        />
      </form>
    );
  }

  componentDidMount() {
    // If there's no placeholder, fetch it.
    if (this.props.placeholder.id === '') {
      this.props.dispatch(fetchSuggestions());
    }
  }
}

SearchBar.defaultProps = {
  docked: false,
  history: {},
};
