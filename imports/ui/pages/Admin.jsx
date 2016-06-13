import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'

import NavBar from '../components/NavBar.jsx';
 
import AdminEvent from '../components/AdminEvent.jsx';
import {Events} from '../../api/events.js';
 
export default class Admin extends Component {
  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    Events.insert({
      text,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
  renderEvents() {
    return this.props.events.map((event) => (
      <AdminEvent key={event._id} event={event} />
    ));
  }
  newEvent() {
    const path = '/newevent';
    browserHistory.push(path);
  }
  render() {
    return (
      <div className="container">
        <header>
          <h1>Cehu List</h1>
          <form className="new-event" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new events"
            />
          </form>
          <button className="btn-new-event" onClick={this.newEvent.bind(this)}>
          &times;
          </button>
        </header>
        <ul>
        {this.renderEvents()}
        </ul>
      </div>
    );
  }
}

Admin.propTypes = {
  events: PropTypes.array.isRequired,
};