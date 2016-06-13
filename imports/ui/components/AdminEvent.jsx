import React, { Component, PropTypes } from 'react';
import { Events } from '../../api/events.js';
import { Link } from 'react-router';

export default class AdminEvent extends Component {
	deleteThisEvent() {
    Events.remove(this.props.event._id);
  }

  editThisEvent() {

  }

  render() {
    return (
      <li>
      	<button className="delete" onClick={this.deleteThisEvent.bind(this)}>
          &times;
        </button>
        
          <Link to='/edit'><button className="edit" onClick={this.editThisEvent.bind(this)} /></Link>

        <span className="text">{this.props.event.text}</span>
      </li>
    );
  }
}
 
AdminEvent.propTypes = {
  // We can use propTypes to indicate it is required
  event: PropTypes.object.isRequired,
};