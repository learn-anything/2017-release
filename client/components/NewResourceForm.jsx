import React, { Component } from 'react';


export default class NewResourceForm extends Component {
  render() {
    return (
      <form className="dialog-body">
        {/* title */}
        <label htmlFor="title">
          <input id="title" type="text"/>
        </label>

        {/* category */}

        {/* url */}
        <label htmlFor="url">
          <input id="url" type="text"/>
        </label>
      </form>
    );
  }
}
