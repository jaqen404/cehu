import { Meteor } from 'meteor/meteor';

import { Events } from '../../api/events.js';
import { createContainer } from 'meteor/react-meteor-data';
import Home from '../pages/Home.jsx';

export default createContainer(() => {
  return {
    events: Events.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, Home);
