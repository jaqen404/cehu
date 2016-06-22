import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/events.js';
import { Link,browserHistory } from 'react-router';

export default class AdminEvent extends Component {
	deleteThisEvent() {
    Meteor.call('events.remove',this.props.event._id);
  }

  editThisEvent() {
    const path = `/edit/${this.props.event._id}`;
    browserHistory.push(path);
  }

  render() {
    return (
      <li>
      	<button className="delete" onClick={this.deleteThisEvent.bind(this)}>
          &times;
        </button>
        <button className="delete" onClick={this.editThisEvent.bind(this)}>
          &times;
        </button>
        <span className="text">{this.props.event.title}</span>
      </li>
    );
  }
}
 
AdminEvent.propTypes = {
  // We can use propTypes to indicate it is required
  event: PropTypes.object.isRequired,
};