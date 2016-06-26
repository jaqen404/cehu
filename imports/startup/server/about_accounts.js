
Accounts.onCreateUser(function(options, user) {

  // Semantics for adding things to users after the user document has been inserted
    // const userId = user._id = Random.id();
    if (Roles.getAllRoles().fetch().length == 0 ) {
        const userId = user._id;
        let handle = Meteor.users.find({_id: userId}, {fields: {_id: 1}}).observe({
            added: function () {
                Roles.addUsersToRoles(userId, ['super-admin']);
                handle.stop();
                handle = null;
            }
        });

        // In case the document is never inserted
        Meteor.setTimeout(function() {
            if (handle) {
                handle.stop();
            }
        }, 30000);
    }
    return user;
});