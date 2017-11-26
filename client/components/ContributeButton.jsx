import React, { Component } from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { showDialog } from 'actions/Dialog';
import queries from 'constants/media-queries.json';
import actions from 'constants/actions.json';
import classNames from 'utils/classNames';
import 'sass/_ContributeButton.sass';


@connect(store => ({
  editing: store.map.editing,
  mapTitle: store.map.title,
}))
export default class ContributeButton extends Component {
  constructor(props) {
    super(props);

    this.toggleEditing = this.toggleEditing.bind(this);
  }

  toggleEditing() {
    if (!window.laAuth.isAuthenticated()) {
      this.props.dispatch(showDialog(__('unauthorized_dialog')));
      return;
    }

    this.props.dispatch({ type: actions.map.toggleEditing });
    if (!this.props.editing) {
      this.props.dispatch({
        type: actions.ga.contribution.improveMap,
        payload: this.props.mapTitle,
      });
    }
  }

  render() {
    const className = classNames({
      'contribute-button': true,
      'contribute-button--editing': this.props.editing,
    });

    return (
      <div>
        <MediaQuery maxWidth={queries.m}>
          <button className={className} type="button" onClick={this.toggleEditing}>
            {this.props.editing ?
              <img src="/static/icons/tick.svg" alt="done"/>
              :
              <img src="/static/icons/edit.svg" alt="edit"/>
            }
          </button>
        </MediaQuery>

        <MediaQuery minWidth={queries.m + 1}>
          <button className={className} type="button" onClick={this.toggleEditing}>
            {this.props.editing ?
              __('contribute_button_text_editing') : __('contribute_button_text')
            }
          </button>
        </MediaQuery>
      </div>
    );
  }
}
