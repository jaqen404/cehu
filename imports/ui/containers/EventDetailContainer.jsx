import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/events.js';
import { createContainer } from 'meteor/react-meteor-data';
import EventDetail from '../pages/EventDetail.jsx';
import { UsersEvents } from '../../api/usersevents.js';

export default createContainer(({ params: { id } }) => {
	Meteor.subscribe('events');
	Meteor.subscribe('usersevents');
  const event = Events.findOne(id);
  const eventExists = !!event;
  let userEvent = {};
  if (Meteor.userId()) {
  	userEvent = UsersEvents.findOne({userId: Meteor.userId(),eventId: event._id});
  }
  return {
    eventExists,
    event: eventExists ? event : {},
    userEvent: userEvent,
  };
}, EventDetail);
