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
    const now  = new Date();
 		event['updateAt'] = now;
    const score = event.score ? event.score : 0;
    event['score'] = Math.max(now.getTime(),score);
    //存在id则是修改，不存在就新插入
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
      event['createdAt'] = now;
 			Events.insert(event);
      //不能让每日都有的预测在版面上占太多，有新的插入时就让旧的沉没
      const tags = new Set(event.tags);
      if (tags.has('每日') && Meteor.isServer) {
        const sinkEvent = Events.find({'tags': '每日'},{ sort: { score: -1 }, skip:2, limit:1}).fetch()[0];
        const sankScore = sinkEvent.score - 2*24*60*60*1000;
        Events.update(sinkEvent._id, { $set: {'score': sankScore} });
      }
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