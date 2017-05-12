const triggers = require('../triggers');


const fuzzyMatch = (pattern, str) => {
  let patternIdx = 0;
  let strIdx = 0;
  const patternLength = pattern.length;
  const strLength = str.length;

  while (patternIdx !== patternLength && strIdx !== strLength) {
    const patternChar = pattern.charAt(patternIdx).toLowerCase();
    const strChar = str.charAt(strIdx).toLowerCase();

    if (patternChar === strChar) {
      patternIdx += 1;
    }
    strIdx += 1;
  }

  return patternLength !== 0 && strLength !== 0 && patternIdx === patternLength;
};

// Random placeholder.
const getPlaceholder = () => {
  const index = Math.floor(Math.random() * triggers.length);
  return triggers[index].name;
};

// Return an array of suggestions based on a given query.
const getSuggestions = (query) => {
  const value = query.trim().toLowerCase();

  if (value.length === 0) {
    return [];
  }

  return triggers.filter(trigger => (
    fuzzyMatch(value, trigger.name)
  ));
};

const renderSuggestion = suggestion =>
  RE('div', { className: 'searchbar-suggestion' }, suggestion.name);


module.exports = React.createClass({
  getInitialState: () => ({ query: '', suggestions: [] }),

  // Open selected map.
  onSuggestionSelected(_, { suggestion }) {
    this.setState({ query: suggestion.name });
    location.href = `https://my.mindnode.com/${suggestion.map}`;
  },

  // Load suggestions.
  onSuggestionsFetchRequested({ value }) {
    this.setState({ suggestions: getSuggestions(value) });
  },

  onSuggestionsClearRequested() {
    this.setState({ suggestions: [] });
  },

  render() {
    const inputProps = {
      autoFocus: true,
      value: this.state.query,
      onChange: e => this.setState({ query: e.target.value }),
      placeholder: getPlaceholder(),
    };

    const input = RE(Autosuggest, {
      inputProps,
      renderSuggestion,
      highlightFirstSuggestion: true,
      suggestions: this.state.suggestions,
      getSuggestionValue: suggestion => suggestion.name,
      onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.onSuggestionsClearRequested,
      onSuggestionSelected: this.onSuggestionSelected,
    });

    return RE('div', { className: 'searchbar-container' }, input);
  },
});
