import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';
import { Events } from '../../api/events.js';
import NavBar from '../shared/NavBar.jsx';
 
import AdminEvent from '../components/AdminEvent.jsx';
 
class EventEdit extends Component {
  render() {
    return (
      <div className="container">
        <NavBar />
        <header>
          <h1>Cehu Edit</h1>
        </header>
        { this.props.children }
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    events: Events.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, EventEdit);