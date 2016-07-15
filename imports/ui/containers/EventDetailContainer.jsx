import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/events.js';
import { createContainer } from 'meteor/react-meteor-data';
import EventDetail from '../pages/EventDetail.jsx';
import { UsersEvents } from '../../api/usersevents.js';
import { Comments } from '../../api/comments.js';

export default createContainer(({ params: { id } }) => {
	Meteor.subscribe('events');
	Meteor.subscribe('usersevents');
  const event = Events.findOne(id);
  const eventExists = !!event;
  let userEvent = {};
  const currentUser = Meteor.userId();
  //确保用户已登录，且存在这个事件
  if (!!Meteor.userId() && eventExists) {
  	userEvent = UsersEvents.findOne({userId: Meteor.userId(),eventId: event._id});
  } else {
    userEvent = null;
  }
  Meteor.subscribe('commentsByEventId', event && event._id);
  return {
    eventExists,
    event: eventExists ? event : {},
    userEvent: userEvent,
    comments: Comments.find().fetch(),
    currentUser: currentUser,
  };
}, EventDetail);
