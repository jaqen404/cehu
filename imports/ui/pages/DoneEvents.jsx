import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import EventsList from '../components/EventsList'
import Paper from 'material-ui/Paper';
import Event from '../components/Event.jsx';
 
// App component - represents the whole app
export default class DoneEvents extends Component {
  render() {
    const styles = {
      card: {
        marginRight: 50,
      },
    };
    return (
      <Paper zDepth={1} >
        <EventsList currentUser={this.props.currentUser} events={this.props.events} usersEvents={this.props.usersEvents}/>
      </Paper>
    );
  }
}

DoneEvents.PropTypes = {
  currentUser: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
  usersEvents: PropTypes.array,
};