Meteor.publish("users", function () {
    return Meteor.users.find({}, {fields: {emails: 1, profile: 1, name:1, email:1, lastName:1, password:1}});
});