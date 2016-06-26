import { Meteor } from 'meteor/meteor';

import { Events } from '../../api/events.js';
import { createContainer } from 'meteor/react-meteor-data';
import Home from '../pages/Home.jsx';
import { UsersEvents } from '../../api/usersevents.js';

export default createContainer(() => {
	const currentUser = Meteor.userId();
	Meteor.subscribe('events');
	Meteor.subscribe('usersEventsByUserId');
	Meteor.subscribe('userData');
  return {
  	currentUser: currentUser,
    events: Events.find({}, { sort: { createdAt: -1 } }).fetch(),
    usersEvents: UsersEvents.find().fetch(),
  };
}, Home);
