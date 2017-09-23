import SearchBar from 'components/SearchBar';
import MindMapWrapper from 'containers/MindMapWrapper';
// import ContributeButton from 'components/ContributeButton';


export function thankYou() {
  return (
    <div>
      <h1 className="thank-you-text">
        Thank you for&nbsp;
        <a className="patreon-link" href="https://www.patreon.com/learnanything">
          supporting our project
        </a>!<br/>
        You are amazing 💛
      </h1>

      <MindMapWrapper />
    </div>
  );
}

export function map() {
  return (
    <div>
      <div className="welcome-bubble">
        <div className="welcome-bubble-text" dangerouslySetInnerHTML={{ __html: __('welcome_text') }} />
        <div className="welcome-bubble-ellipse" />
      </div>
      <img className="la-logo" src="/logo.svg" alt="logo"/>
      <h1 className="first-search-title">{__('first_search_title')}</h1>
      <SearchBar
        dispatch={this.props.dispatch}
        title={this.props.title}
        query={this.props.query}
        placeholder={this.props.placeholder}
        suggestions={this.props.suggestions}
        loading={this.props.loading}
      />

      {/* <MindMapWrapper /> */}
      <p className="helpText" dangerouslySetInnerHTML={{ __html: __('searchbar_help_text') }}/>
      {/* TotalSearches */}
    </div>
  );
}
