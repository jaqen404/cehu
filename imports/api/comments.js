import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Comments = new Mongo.Collection('comments');
Meteor.methods({
	'comments.insert': function(event,text) {
    check(event, Object);
    check(text, String);

    //Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    const user = Meteor.user();
    const userName = ( user.profile && user.profile.nick ) || user.username || user.emails[0].address.split('@')[0];
    Comments.insert({
      text,
      userName,
      eventId: event._id,
      eventTitle: event.title,
      userId: Meteor.userId(),
      createdAt: new Date(),
      // owner: Meteor.userId(),
      // username: Meteor.user().username,
    });
  },
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('commentsByEventId', function(eventId) {
    return Comments.find({eventId: eventId});
  });
}