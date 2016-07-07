import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Tags = new Mongo.Collection('tags');
Meteor.methods({
	'tags.insert': function(name) {
    check(name, String);
    //Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Tags.insert({
      name,
      createdAt: new Date(),
      // owner: Meteor.userId(),
      // username: Meteor.user().username,
    });
  },
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tags', function() {
    return Tags.find();
  });
}