import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const UsersEvents = new Mongo.Collection('usersevents');
Meteor.methods({
	'usersevents.insert': function(eventId,answerIndex,answer) {
    check(eventId, String);
    check(answer, String);
    check(answerIndex, String);

    //Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    UsersEvents.insert({
    	eventId,
      answer,
      answerIndex,
      userId: Meteor.userId(),
      createdAt: new Date(),
      // owner: Meteor.userId(),
      // username: Meteor.user().username,
    });
  },
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('usersevents', function() {
    return UsersEvents.find();
  });
  Meteor.publish('usersEventsByUserId', function() {
    return UsersEvents.find({userId: this.userId});
  });
}