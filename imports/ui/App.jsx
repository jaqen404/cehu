import React, { Component, PropTypes } from 'react';

import { createContainer } from 'meteor/react-meteor-data';
import { Events } from '../api/events.js';
 
import Event from './Event.jsx';
import {List} from 'material-ui/List';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

 
// App component - represents the whole app
class App extends Component {
  renderEvents() {
    return This.props.events.map((event) => (
      <Task key={event._id} event={event} />
    ));
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div className="container">
        <header>
          <h1>Cehu List</h1>
        </header>
        {this.renderEvents()}
      </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  events: PropTypes.array.isRequired,
};
 
export default createContainer(() => {
  return {
    events: Events.find({}).fetch(),
  };
}, App);