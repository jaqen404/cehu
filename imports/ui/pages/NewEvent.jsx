import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

import {Events} from '../../api/events.js';
import TextField from 'material-ui/TextField';
import {Card} from 'material-ui/Card';

export default class NewEvent extends Component {
  handleSubmit(e) {
    e.preventDefault();
    const title = e.target.elements[0].value.trim();
    const text = e.target.elements[2].value;
    const answers = e.target.elements[4].value.trim().split(',');
    Meteor.call('events.insert', title, text, answers);
    const path = "/admin";
    browserHistory.push(path);
  }
  render() {
    const styles = {
      card: {
        marginRight: 50,
        marginTop: 15,
        padding: 20,
      },
    };
    return (
      <Card style={styles.card}>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <TextField
          hintText="event title"
          floatingLabelText="MultiLine and FloatingLabel"
          multiLine={true}
          rows={2}
        /><br />
        <TextField
          hintText="event text"
          floatingLabelText="MultiLine and FloatingLabel"
          multiLine={true}
          rows={2}
        /><br />
        <TextField
          hintText="event answers"
          floatingLabelText="MultiLine and FloatingLabel"
          multiLine={true}
          rows={2}
        /><br /><br /><br /><br /><br /><br /><br /><br />
        <button type="submit">Go</button>
      </form>
      </Card>
    );
  }
}