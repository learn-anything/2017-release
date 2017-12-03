import React, { Component } from 'react';
import Select from 'react-select-me';
import { hideDialog } from 'actions/Dialog';
import { createResource } from 'actions/Map';
import store from 'store/store';
import actions from 'constants/actions.json';
import categories from 'constants/resource-categories.json';
import 'sass/_NewResourceForm.sass';
import url from 'url';


export default class NewResourceForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.textIsValid = this.textIsValid.bind(this);
    this.urlIsValid = this.urlIsValid.bind(this);
    this.categoryIsValid = this.categoryIsValid.bind(this);

    this.state = {
      text: '',
      url: '',
      category: null,
      textError: undefined,
      urlError: undefined,
      categoryError: undefined,
    };
  }

  cancel() {
    store.dispatch(hideDialog());
  }

  textIsValid() {
    if (this.state.text && this.state.text.trim().length >= 6) {
      this.setState({ textError: null });
      return true;
    }

    this.setState({ textError: 'Resource name has to be at least 6 characters long' });
    return false;
  }

  urlIsValid() {
    if (!this.state.url) {
      this.setState({ urlError: 'URL cannot be empty' });
      return false;
    }

    const parsedUrl = url.parse(this.state.url);
    if (parsedUrl.host && parsedUrl.protocol) {
      this.setState({ urlError: null });
      return true;
    }

    this.setState({ urlError: 'Invalid URL (did you forget "https://"?)' });
    return false;
  }

  categoryIsValid() {
    if (this.state.category) {
      this.setState({ categoryError: null });
      return true;
    }

    this.setState({ categoryError: 'You must select a category' });
    return false;
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
    this[`${target.name}IsValid`]();
  }

  handleSelectChange({ value }) {
    this.setState({ category: value });
    this.categoryIsValid();
  }

  handleSubmit(event) {
    event.preventDefault();

    const textIsValid = this.textIsValid();
    const categoryIsValid = this.categoryIsValid();
    const urlIsValid = this.urlIsValid();

    if (textIsValid && categoryIsValid && urlIsValid) {
      store.dispatch(createResource(
        this.state.text,
        this.state.category,
        this.state.url,
        this.props.node.nodeID,
      ));

      store.dispatch({
        type: actions.ga.contribution.createResource,
        payload: JSON.stringify({
          text: this.state.text,
          category: this.state.category,
          url: this.state.url,
          parentID: this.props.node.nodeID,
        }, null, 2),
      });
    }
  }

  iconRenderer(isOpen) {
    return (isOpen ?
      <img src="/static/icons/arrow.svg" className="form-select-opened" /> :
      <img src="/static/icons/arrow.svg" className="form-select-closed" />
    );
  }

  optionRenderer(option) {
    return (
      <div key={option.value} className="dd__option">
        <img src={`/static/icons/${option.icon}.svg`} alt={option.icon} />
        {option.label}
      </div>
    );
  }

  render() {
    return (
      <form
        className="dialog-body new-resource-form"
        onSubmit={this.handleSubmit}
      >
        <h1>
          {__('new_resource_add_resource')}:&nbsp;
          <span>{this.props.node.text}</span>
        </h1>

        {/* text */}
        <label>
          <div>{__('new_resource_name')}</div>
          <input
            name="text"
            value={this.state.text}
            onChange={this.handleChange}
            onKeyUp={this.handleChange}
            className="text-field"
            type="text"
            autoFocus={true}
          />
          {this.state.textError &&
            <div className="text-field--error">{this.state.textError}</div>
          }
        </label>

        {/* category */}
        <label>
          <div>{__('new_resource_category')}</div>
          <Select
            options={categories}
            value={this.state.category}
            onChange={this.handleSelectChange}
            onClose={this.categoryIsValid}
            iconRenderer={this.iconRenderer}
            optionRenderer={this.optionRenderer}
            selectedValueRenderer={this.optionRenderer}
          />
          {this.state.categoryError &&
            <div className="text-field--error">{this.state.categoryError}</div>
          }
        </label>

        {/* url */}
        <label>
          <div>{__('new_resource_url')}</div>
          <input
            name="url"
            value={this.state.url}
            onChange={this.handleChange}
            onKeyUp={this.handleChange}
            className="text-field"
            type="text"
          />
          {this.state.urlError &&
            <div className="text-field--error">{this.state.urlError}</div>
          }
        </label>

        <div className="dialog-footer-buttons">
          <button
            onClick={this.cancel}
            className="button-cancel"
            type="button"
          >
            {__('dialog_cancel')}
          </button>
            <button className="button-submit" type="submit">{__('dialog_done')}</button>
        </div>
      </form>
    );
  }
}
