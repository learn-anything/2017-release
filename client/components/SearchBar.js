// eslint-disable-next-line no-unused-vars
const SearchBar = React.createClass({
  getInitialState: () => ({ query: '' }),

  // Get all suggestions based on a given query
  getSuggestions(query) {
    const value = query.trim().toLowerCase();

    if (value.length === 0) {
      return [];
    }

    return triggers.filter(trigger => (
      trigger.name.slice(0, value.length) === value
    ));
  },

  onSuggestionClick(event) {
    const suggestion = JSON.parse(event.target.getAttribute('value'));
    this.setState({ query: suggestion.name });

    if (suggestion.map) {
      window.open(`https://my.mindnode.com/${suggestion.map}`);
    }
  },

  // Update query, then rerender
  onChange(event) {
    this.setState({ query: event.target.value });
  },

  // Return an array of React elements, representing suggestions
  // based on a given query
  renderSuggestions(query) {
    const suggestions = this.getSuggestions(query);

    return suggestions.map((suggestion, i) => (
      RE('div', {
        className: 'searchbar-suggestion',
        onClick: this.onSuggestionClick,
        value: JSON.stringify(suggestion),
        key: i,
      }, suggestion.name)
    ));
  },

  render() {
    const input = RE('input', {
      className: 'searchbar-input',
      onChange: this.onChange,
      value: this.state.query,
      placeholder: 'I want to  learn ...',
    });

    const suggestions = RE('div', { className: 'searchbar-suggestions' },
      this.renderSuggestions(this.state.query));

    return RE('div', { className: 'searchbar-container' }, input, suggestions);
  },
});
