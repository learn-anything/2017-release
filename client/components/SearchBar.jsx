import { Component, PropTypes } from 'react';
import { Redirect } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';

import { getSuggestions, randomTrigger } from '../utils/autocomplete';
import '../sass/_SearchBar.sass';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { query: '', suggestions: [], url: null, prevUrl: null };
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.props.url.on('data', ({ value }) => {
      this.setState({ url: value, prevUrl: this.state.url });
    });
  }

  onSuggestionSelected(_, { suggestion }) {
    const loadSuggestion = () => {
      const url = `/${suggestion.map.replace(/_-_/g, '/')}`;
      this.setState({ url, prevUrl: this.state.url, query: suggestion.name });
    };

    setTimeout(loadSuggestion, 500);
    ga('send', 'event', {
      eventCategory: 'Search',
      eventAction: 'selected suggestion',
      eventLabel: suggestion.name,
      hitCallback: loadSuggestion,
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

    if (getSuggestions(query).length === 0) {
      const showSnackbar = () =>
        this.props.message.set('Sorry you can\'t search that yet 😞');

      setTimeout(showSnackbar, 500);
      ga('send', 'event', {
        eventCategory: 'Search',
        eventAction: 'unmatched query',
        eventLabel: query,
        hitCallback: showSnackbar,
      });
    }
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

    let containerClassName = 'searchbar-container ';
    if (this.props.exploring) {
      containerClassName += 'searchbar-container--exploring';
    }

    return (
      <div>
        <form className={containerClassName} onSubmit={this.onSubmit}>
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
          {this.state.url !== this.state.prevUrl ? <Redirect push to={this.state.url} /> : ''}
        </form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  message: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  exploring: PropTypes.boolean,
};
