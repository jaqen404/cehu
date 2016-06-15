import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const UsersEvents = new Mongo.Collection('usersevents');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('usersevents', function tasksPublication() {
    return UsersEvents.find();
  });
}

// Meteor.methods({

// });