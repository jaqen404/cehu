import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import {UsersEvents} from './usersevents.js';
 
export const Events = new Mongo.Collection('events');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('events', function() {
    return Events.find();
  });
  Meteor.publish('eventsByUserId', function() {
    const eventsIds = UsersEvents.find({userId: this.userId}, { eventId: 1, _id:0 }).fetch().map((userevent)=>(userevent.eventId));
    return Events.find({ _id: { $in: eventsIds }});
  });
}

Meteor.methods({
  'events.insert'(event, oldRightIndex) {
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
    UsersEvents.remove({eventId: eventId});
    Events.remove(eventId);
  },
  // 'events.up'
  // Tasks.update(taskId, { $set: { private: setToPrivate } });
});