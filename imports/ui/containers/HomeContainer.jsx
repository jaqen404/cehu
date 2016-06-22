import { Meteor } from 'meteor/meteor';

import { Events } from '../../api/events.js';
import { createContainer } from 'meteor/react-meteor-data';
import Home from '../pages/Home.jsx';
import { UsersEvents } from '../../api/usersevents.js';

export default createContainer(() => {
	Meteor.subscribe('events');
	Meteor.subscribe('usersevents');
  return {
  	currentUser: Meteor.userId(),
    events: Events.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, Home);
