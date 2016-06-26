import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'

import NavBar from '../components/NavBar.jsx';
import FlatButton from 'material-ui/FlatButton';
 
import AdminEvent from '../components/AdminEvent.jsx';
import {Events} from '../../api/events.js';
 
export default class Admin extends Component {
  componentDidMount() {
    // const isAdmin = Roles.userIsInRole(Meteor.userId(), 'super-admin')
    // if (!isAdmin) {
    //   browserHistory.push('/');
    // }
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
    const isAdmin = Roles.userIsInRole(Meteor.userId(), 'super-admin');
    return isAdmin ? (
      <div className="container">
        <header>
          <br /><br /><br />
          <FlatButton label="新建" primary={true} onClick={this.newEvent.bind(this)}/>
        </header>
        <ul>
        {this.renderEvents()}
        </ul>
      </div>
    ) : <div></div>;
  }
}

Admin.propTypes = {
  events: PropTypes.array.isRequired,
};
Admin.contextTypes = {
  router: React.PropTypes.object.isRequired
};