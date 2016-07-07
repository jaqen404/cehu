import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Paper from 'material-ui/Paper';
import Event from '../components/Event.jsx';
 
// App component - represents the whole app
export default class EventsList extends Component {
  renderEvents() {
    const usersEvents = this.props.usersEvents;
    return this.props.events.map((event) => {
      const userEvent = usersEvents.filter((userEvent)=> event._id == userEvent.eventId)[0];
      return <Event key={event._id} event={event} userEvent={userEvent}/>
    });
  }
  render() {
    const styles = {
      card: {
        marginRight: 20,
      },
    };
    return (
        <Paper zDepth={1} style={styles.card}>
          {this.props.eventsIsReady ? this.renderEvents() : ''}
        </Paper>
    );
  }
}

EventsList.PropTypes = {
  currentUser: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
  usersEvents: PropTypes.array,
};