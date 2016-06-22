import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/events.js';
import { createContainer } from 'meteor/react-meteor-data';
import NewEvent from '../pages/NewEvent.jsx';

export default createContainer(({ params: { id } }) => {
	Meteor.subscribe('events');
  const event = Events.findOne(id);
  const eventExists = !!event;
  return {
    eventExists,
    event: eventExists ? event : {},
  };
}, NewEvent);