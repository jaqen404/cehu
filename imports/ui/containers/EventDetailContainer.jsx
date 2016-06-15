import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/events.js';
import { createContainer } from 'meteor/react-meteor-data';
import EventDetail from '../pages/EventDetail.jsx';

export default createContainer(({ params: { id } }) => {
	Meteor.subscribe('events');
  console.log(Events.findOne(id));
  const event = Events.findOne(id);
  const eventExists = !!event;
  return {
    eventExists,
    event: eventExists ? event : {},
  };
}, EventDetail);
