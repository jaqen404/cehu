import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import {UsersEvents} from './usersevents.js';
 
export const Events = new Mongo.Collection('events');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('events', function tasksPublication() {
    return Events.find();
  });
}

Meteor.methods({
  'events.insert'(event, oldRightIndex) {
  	const {title,text,answers,publishDate,publishTime,rightAnswer,rightIndex} = event;
    check(event, Object);
    check(oldRightIndex, String);
    // Make sure the user is logged in before inserting a task
    // if (! Meteor.userId()) {
    //   throw new Meteor.Error('not-authorized');
    // }
 		event['createdAt'] = new Date();
 		if (event._id) {
 			//Events.save(event);
      const eventId = event._id;
      delete event._id;
      Events.update(eventId, { $set: event });
      if (oldRightIndex != event.rightIndex) {
        UsersEvents.find({eventId: eventId}).fetch().forEach(
          (ue)=>{
            UsersEvents.update(ue._id, { $set: {isRight: () => event.rightIndex == ue.answerIndex}});
          }
        );
      }
 		} else {
 			Events.insert(event);
 		}
  },
  'events.remove'(eventId) {
    check(eventId, String);
 
    Events.remove(eventId);
  },
  // 'events.up'
  // Tasks.update(taskId, { $set: { private: setToPrivate } });
});