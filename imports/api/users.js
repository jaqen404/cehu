if (Meteor.isServer) {
  Meteor.publish('userData', function() {
    return Meteor.users.find({userId: this.userId});
  });
}