import { Meteor } from 'meteor/meteor';

import { Events } from '../../api/events.js';
import { createContainer } from 'meteor/react-meteor-data';
import EventsList from '../pages/EventsList.jsx';

export default createContainer(() => {
	Meteor.subscribe('events');
  return {
  	currentUser: Meteor.userId(),
    events: Events.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, EventsList);
