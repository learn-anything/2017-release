// eslint-disable-next-line no-unused-vars
const SearchBar = React.createClass({
  getInitialState: () => ({ query: '' }),

  // Get all suggestions based on a given query
  getSuggestions(query) {
    const value = query.trim().toLowerCase();
    const triggers = [
      { name: 'learn math' },
      { name: 'learn physics' },
      { name: 'learn machine learning' },
      { name: 'books on' },
      { name: 'courses on' },
      { name: 'research papers on' },
      { name: 'interesting blogs on' },
    ];

    if (value.length === 0) {
      return [];
    }

    return triggers.filter(trigger => (
      trigger.name.slice(0, value.length) === value
    ));
  },

  // Return an array of React elements, representing suggestions
  // based on a given query
  renderSuggestions(query) {
    const suggestions = this.getSuggestions(query);

    return suggestions.map((suggestion, i) => (
      RE('div', { className: 'searchbar-suggestion', key: i }, suggestion.name)
    ));
  },

  // Update query, then rerender
  onChange(event) {
    this.setState({ query: event.target.value });
  },

  render() {
    const input = RE('input', {
      className: 'searchbar-input',
      onChange: this.onChange,
      value: this.state.query,
      placeholder: 'I wanna learn ...',
    });

    const suggestions = RE('div', { className: 'searchbar-suggestions' },
      this.renderSuggestions(this.state.query));

    return RE('div', { className: 'searchbar-container' }, input, suggestions);
  },
});
