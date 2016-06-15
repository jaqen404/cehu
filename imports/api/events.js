import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import UsersEvents from './usersevents.js';
 
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
  'usersevents.insert'(eventId,answer) {
    check(eventId, String);
    check(answer, String);
 
    // Make sure the user is logged in before inserting a task
    // if (! Meteor.userId()) {
    //   throw new Meteor.Error('not-authorized');
    // }
 
    UsersEvents.insert({
      eventId,
      answer,
      userId: Meteor.userId(),
      createdAt: new Date(),
      // owner: Meteor.userId(),
      // username: Meteor.user().username,
    });
  },
});