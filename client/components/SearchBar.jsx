import { Component } from 'react';

import { getSuggestions, randomTrigger } from '../utils/autocomplete';
import '../sass/_SearchBar.sass';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { query: '', suggestions: [] };
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSuggestionSelected(_, { suggestion }) {
    const loadSuggestion = () => {
      this.setState({ query: suggestion.name });
      location.href = `https://my.mindnode.com/${suggestion.map}`;
    };

    setTimeout(loadSuggestion, 500);
    ga('send', 'event', {
      eventCategory: 'Search',
      eventAction: 'selected suggestion',
      eventLabel: suggestion.name,
      hitCallback: () => {
      },
    });
  }

  onSuggestionsFetchRequested({ value }) {
    this.setState({ suggestions: getSuggestions(value) });
  }

  onSuggestionsClearRequested() {
    this.setState({ suggestions: [] });
  }

  onSubmit(event) {
    event.preventDefault();
    const query = event.target.children[0].children[0].value.trim().toLowerCase();

    ga('send', 'event', {
      eventCategory: 'Search',
      eventAction: 'suggestion not found',
      eventLabel: query,
      hitCallback: () => {
        this.setState({ query: '' });
      },
    });
  }

  render() {
    const renderSuggestion = ({ name }) => (
      <div className="searchbar-suggestion">{name}</div>
    );

    const inputProps = {
      autoFocus: true,
      value: this.state.query,
      onChange: e => this.setState({ query: e.target.value }),
      placeholder: randomTrigger().name,
    };

    return (
      <form className="searchbar-container" onSubmit={this.onSubmit}>
        <Autosuggest
          inputProps={inputProps}
          renderSuggestion={renderSuggestion}
          highlightFirstSuggestion={true}
          suggestions={this.state.suggestions}
          getSuggestionValue={suggestion => suggestion.name}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
        />
      </form>
    );
  }
}
