import { Meteor } from 'meteor/meteor';

import { Events } from '../../api/events.js';
import { UsersEvents } from '../../api/usersevents.js';
import { createContainer } from 'meteor/react-meteor-data';
import DoneEvents from '../pages/DoneEvents.jsx';

export default createContainer(() => {
	const currentUser = Meteor.userId();
	Meteor.subscribe('eventsByUserId');
	Meteor.subscribe('usersEventsByUserId');
	// eventsIds = UsersEvents.find({}, { eventId: 1, _id:0 }).fetch().map((userevent)=>(userevent.eventId));
  return {
    // events: Events.find({ _id: { $in: eventsIds }}, { sort: { createdAt: -1 } }).fetch(),
    events: Events.find({}, { sort: { createdAt: -1 } }).fetch(),
    usersEvents: UsersEvents.find().fetch(),
    currentUser: currentUser,
  };
}, DoneEvents);
