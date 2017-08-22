import SearchBar from 'components/SearchBar';
import MindMapWrapper from 'containers/MindMapWrapper';
import ContributeButton from 'components/ContributeButton';


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
      <SearchBar
        dispatch={this.props.dispatch}
        title={this.props.title}
        query={this.props.query}
        placeholder={this.props.placeholder}
        suggestions={this.props.suggestions}
        loading={this.props.loading}
      />

      <MindMapWrapper />

      <ContributeButton title={this.props.title} />
    </div>
  );
}
