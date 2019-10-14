import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'utils/classNames';
import 'sass/_Logo.sass';

export default class Logo extends Component {
  render() {
    const logoClassNames = classNames({
      'la-logo-icon': true,
      'la-logo-icon--big': this.props.big,
    });

    return (
      <div className="la-logo-container">
        { this.props.welcome ?
          <div className="welcome-bubble">
            <div className="welcome-bubble-text" dangerouslySetInnerHTML={{ __html: __('welcome_text') }} />
            <div className="welcome-bubble-bubble" />
          </div> : ''
        }

        <Link to="/">
          <img className={logoClassNames} src="/static/icons/logo.svg" alt="logo"/>
        </Link>
      </div>
    );
  }
}

Logo.deaultProps = {
  big: false,
  welcome: false,
};
