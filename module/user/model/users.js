UserStatus = new Mongo.Collection("userStatus");
UserStatus.allow({
    insert: function (userId) {
        //return userId && party.owner === userId;
        return userId;
    },
    update: function (userId, party, fields, modifier) {
        //return userId && party.owner === userId;
        return userId;
    },
    remove: function (userId, party) {
        //return userId && party.owner === userId;
        return userId;
    }
});

//Users = new Mongo.Collection("users");
Meteor.users.allow({
    insert: function (userId) {
        //return userId && party.owner === userId;
        return userId;
    },
    update: function (userId, party, fields, modifier) {
        //return userId && party.owner === userId;
        return userId;
    },
    remove: function (userId, party) {
        //return userId && party.owner === userId;
        return userId;
    }
});

Meteor.methods({
    model: function()
    {
        data = {
            name: {required: true},
            username: {required: true},
            lastName: {required: true},
            password: {required: true},
        };
        return data;
    },
    isValid: function(dataForm){
        console.log(this.data);
        return false;
    },
    userSave: function(form){
        //form.userId = Meteor.userId();
        //if (form._id) {
        //    //var newForm = form;
        //    //delete newForm._id;
        //    //Meteor.users.update({_id: form._id}, { $set: newForm});
        //    Meteor.users.update(form);
        //    //console.log(Meteor.userId());
        //} else {
        //    Meteor.users.insert(form);
        //}
        //form.userId = Meteor.userId();
        //if (this.isValid(form)) {
        var userId = form._id;
        if (form._id) {
            delete form._id;
            Meteor.users.update(userId, { $set: form});
        } else {
            Meteor.users.insert(form);
        }
        //}
    }

    //invite: function (partyId, userId) {
    //    check(partyId, String);
    //    check(userId, String);
    //    var party = Message.findOne(partyId);
    //    if (!party)
    //        throw new Meteor.Error(404, "No such party");
    //    if (party.owner !== this.userId)
    //        throw new Meteor.Error(404, "No such party");
    //    if (party.public)
    //        throw new Meteor.Error(400,
    //            "That party is public. No need to invite people.");
    //
    //    if (userId !== party.owner && ! _.contains(party.invited, userId)) {
    //        Message.update(partyId, { $addToSet: { invited: userId } });
    //
    //        var from = contactEmail(Meteor.users.findOne(this.userId));
    //        var to = contactEmail(Meteor.users.findOne(userId));
    //
    //        if (Meteor.isServer && to) {
    //            // This code only runs on the server. If you didn't want clients
    //            // to be able to see it, you could move it to a separate file.
    //            Email.send({
    //                from: "noreply@socially.com",
    //                to: to,
    //                replyTo: from || undefined,
    //                subject: "PARTY: " + party.title,
    //                text:
    //                "Hey, I just invited you to '" + party.title + "' on Socially." +
    //                "\n\nCome check it out: " + Meteor.absoluteUrl() + "\n"
    //            });
    //        }
    //    }
    //},
    //rsvp: function (partyId, rsvp) {
    //    check(partyId, String);
    //    check(rsvp, String);
    //    if (! this.userId)
    //        throw new Meteor.Error(403, "You must be logged in to RSVP");
    //    if (! _.contains(['yes', 'no', 'maybe'], rsvp))
    //        throw new Meteor.Error(400, "Invalid RSVP");
    //    var party = Message.findOne(partyId);
    //    if (! party)
    //        throw new Meteor.Error(404, "No such party");
    //    if (! party.public && party.owner !== this.userId &&
    //        !_.contains(party.invited, this.userId))
    //    // private, but let's not tell this to the user
    //        throw new Meteor.Error(403, "No such party");
    //
    //    var rsvpIndex = _.indexOf(_.pluck(party.rsvps, 'user'), this.userId);
    //    if (rsvpIndex !== -1) {
    //        // update existing rsvp entry
    //
    //        if (Meteor.isServer) {
    //            // update the appropriate rsvp entry with $
    //            Message.update(
    //                {_id: partyId, "rsvps.user": this.userId},
    //                {$set: {"rsvps.$.rsvp": rsvp}});
    //        } else {
    //            // minimongo doesn't yet support $ in modifier. as a temporary
    //            // workaround, make a modifier that uses an index. this is
    //            // safe on the client since there's only one thread.
    //            var modifier = {$set: {}};
    //            modifier.$set["rsvps." + rsvpIndex + ".rsvp"] = rsvp;
    //            Message.update(partyId, modifier);
    //        }
    //        // Possible improvement: send email to the other people that are
    //        // coming to the party.
    //    } else {
    //        // add new rsvp entry
    //        Message.update(partyId,
    //            {$push: {rsvps: {user: this.userId, rsvp: rsvp}}});
    //    }
    //}
});

//var contactEmail = function (user) {
//    if (user.emails && user.emails.length)
//        return user.emails[0].address;
//    if (user.services && user.services.facebook && user.services.facebook.email)
//        return user.services.facebook.email;
//    return null;
//};