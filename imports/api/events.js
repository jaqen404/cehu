import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Events = new Mongo.Collection('events');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('events', function tasksPublication() {
    return Events.find();
  });
}

Meteor.methods({
  'events.insert'(title,text,answers) {
    check(title, String);
    check(text, String);
    check(answers, Array);
 
    // Make sure the user is logged in before inserting a task
    // if (! Meteor.userId()) {
    //   throw new Meteor.Error('not-authorized');
    // }
 
    Events.insert({
    	title,
      text,
      answers,
      createdAt: new Date(),
      // owner: Meteor.userId(),
      // username: Meteor.user().username,
    });
  },
  'events.remove'(eventId) {
    check(eventId, String);
 
    Events.remove(eventId);
  },
  // 'events.up'
  // Tasks.update(taskId, { $set: { private: setToPrivate } });
});