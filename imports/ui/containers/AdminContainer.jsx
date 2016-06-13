import { Meteor } from 'meteor/meteor';

import { Events } from '../../api/events.js';
import { createContainer } from 'meteor/react-meteor-data';
import Admin from '../pages/Admin.jsx';

export default createContainer(() => {
  return {
     events: Events.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, Admin);
