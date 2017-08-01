import SearchBar from 'components/SearchBar';
import MindMapWrapper from 'containers/MindMapWrapper';
import ContributeButton from 'components/ContributeButton';


export const thankYou = () => (
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

export const map = context => (
  <div>
    <SearchBar
      dispatch={context.props.dispatch}
      title={context.props.title}
      query={context.props.query}
      placeholder={context.props.placeholder}
      suggestions={context.props.suggestions}
    />

    <MindMapWrapper />

    <ContributeButton title={context.props.title} />
  </div>
);
