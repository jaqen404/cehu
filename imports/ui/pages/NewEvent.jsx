import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

import {Events} from '../../api/events.js';

export default class NewEvent extends Component {
  handleSubmit(e) {
    e.preventDefault();
    const title = e.target.elements[0].value.trim();
    const text = e.target.elements[1].value;
    const answers = e.target.elements[2].value.trim().split(',');
    Meteor.call('events.insert', title, text, answers);
    const path = "/admin";
    browserHistory.push(path);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" placeholder="event title"/>
        <input type="text" placeholder="event text"/>
        <input type="text" placeholder="event answers"/>
        <button type="submit">Go</button>
      </form>
    );
  }
}