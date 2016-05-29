Meteor.publish('userStatus', function() {
    return Meteor.users.find({});
});
Meteor.publish("users", function () {
    return Meteor.users.find({});
});