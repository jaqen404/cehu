import { Meteor } from 'meteor/meteor';
import { Tags } from '../../api/tags.js';
import { createContainer } from 'meteor/react-meteor-data';
import NewEvent from '../pages/NewEvent.jsx';

export default createContainer(() => {
	Meteor.subscribe('tags');
  return {
    tags: Tags.find().fetch(),
  };
}, NewEvent);
