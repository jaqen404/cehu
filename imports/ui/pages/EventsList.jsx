import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import Event from '../components/Event.jsx';
 
// App component - represents the whole app
export default class EventsList extends Component {
  renderEvents() {
    return this.props.events.map((event) => (
      <Event key={event._id} event={event} />
    ));
  }
  render() {
    const styles = {
      card: {
        marginRight: 50,
      },
    };
    return (
      <div className="container">
      <header>
          <h1>Cehu List</h1>
      </header>
      <Card style={styles.card}>
        {this.renderEvents()}
      </Card>
      </div>
    );
  }
}

EventsList.PropTypes = {
  currentUser: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
};