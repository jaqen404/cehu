import { Meteor } from 'meteor/meteor';

import { Events } from '../../api/events.js';
import { UsersEvents } from '../../api/usersevents.js';
import { createContainer } from 'meteor/react-meteor-data';
import EventsList from '../pages/EventsList.jsx';

export default createContainer(() => {
	Meteor.subscribe('events');
	Meteor.subscribe('usersevents');
	eventsIds = UsersEvents.find({userId: Meteor.userId()}, { eventId: 1, _id:0 }).fetch().map((userevent)=>(userevent.eventId));
  return {
    events: Events.find({ _id: { $in: eventsIds }}, { sort: { createdAt: -1 } }).fetch(),
  };
}, EventsList);
