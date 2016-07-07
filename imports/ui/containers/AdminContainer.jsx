import { Meteor } from 'meteor/meteor';

import { Events } from '../../api/events.js';
import { createContainer } from 'meteor/react-meteor-data';
import Admin from '../pages/Admin.jsx';

export default createContainer(() => {
	Meteor.subscribe('events');
	Meteor.subscribe('userData');
	const isAdmin = Roles.userIsInRole(Meteor.userId(), 'super-admin');
	console.log(isAdmin);
  return {
     events: Events.find({}, { sort: { score: -1 } }).fetch(),
     isAdmin: isAdmin,
  };
}, Admin);
