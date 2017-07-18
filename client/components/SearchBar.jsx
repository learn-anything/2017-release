import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';

import { fetchSuggestions, clearSuggestions, updateQuery, clearQuery } from '../actions/Search';
import { randomTrigger, getSuggestions } from '../utils/autocomplete';
import fetchMap from '../actions/fetchMap';
import UnmatchedDialog from './dialogs/UnmatchedDialog.jsx'
import { showUnmatched } from '../actions/dialogs';
import '../sass/_SearchBar.sass';

const renderSuggestion = ({ name }) =>
  <div className="searchbar-suggestion">{name}</div>;

// Get query and suggestions from store.
@connect(store => ({
  query: store.search.query,
  suggestions: store.search.suggestions,
  exploring: store.map.exploring,
  placeholder: randomTrigger(),
}))
export default class SearchBar extends Component {

  onSuggestionSelected(event, { suggestion }) {
    event.preventDefault();

    // Send selected suggestion to GA.
    ga('send', 'event', {
      eventCategory: 'Search',
      eventAction: 'selected suggestion',
      eventLabel: suggestion.name,
    });

    const url = suggestion.map.replace(/---/g, '/');
    this.props.dispatch(fetchMap(url));
    this.props.dispatch(clearQuery());
    ga('send', 'pageview', `/${url}`);
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.props.query.length > 0) {
      if (getSuggestions(this.props.query).length === 0) {
        // Send unmatched query to GA.
        ga('send', 'event', {
          eventCategory: 'Search',
          eventAction: 'unmatched query',
          eventLabel: this.props.query,
        });

        this.props.dispatch(showUnmatched(this.props.query));
      }
    } else {
      // if you haven't written anything into the textbox when hittin enter
      // then show the randomly chosen map
      ga('send', 'event', {
        eventCategory: 'Search',
        eventAction: 'random selected',
        eventLabel: this.props.placeholder.name,
      });

      const url = this.props.placeholder.map.replace(/---/g, '/');
      this.props.dispatch(fetchMap(url));
      this.props.dispatch(clearQuery());
      ga('send', 'pageview', `/${url}`);
    }
  }
  render() {
    // Props to give to input field.
    const inputProps = {
      autoFocus: true,
      value: this.props.query,
      onChange: e => this.props.dispatch(updateQuery(e.target.value)),
      placeholder: this.props.placeholder.name,
    };

    // Handlers for updating and clearing suggestions.
    const onFetchRequested = ({ value }) => this.props.dispatch(fetchSuggestions(value));
    const onClearRequested = () => this.props.dispatch(clearSuggestions());

    // Class for container, changes when container is in exploring mode.
    let containerClassName = 'searchbar-container';
    if (this.props.exploring) {
      containerClassName += ' searchbar-container--exploring';
    }

    return (
      <form className={containerClassName} onSubmit={this.onSubmit.bind(this)}>
        <Autosuggest
          inputProps={inputProps}
          renderSuggestion={renderSuggestion}
          highlightFirstSuggestion={true}
          suggestions={this.props.suggestions}
          getSuggestionValue={suggestion => suggestion.name}
          onSuggestionsFetchRequested={onFetchRequested}
          onSuggestionsClearRequested={onClearRequested}
          onSuggestionSelected={this.onSuggestionSelected.bind(this)}
        />
        <p className="introText">
          Press Enter to open our randomly suggested map.<br></br>
          Start writing to get a list of existing topics.
        </p>
        <UnmatchedDialog />
      </form>
    );
  }
}
