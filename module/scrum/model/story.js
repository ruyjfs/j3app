Story = new Mongo.Collection("story");
Story.allow({
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
    storySave: function(dataForm){
        if (!dataForm.userId) {
            dataForm.userId = Meteor.userId();
        }

        if (dataForm._id) {
            id = dataForm._id;
            delete dataForm._id;
            Story.update(id, { $set: dataForm});
        } else {
            Story.insert(dataForm);
        }
    },
    storyFindByProject: function(param){
        stories = Story.find({$or: [{projectId: param.projectId}, {projectId: null}]}).map(function(story){
            var states = Status.find({projectId: param.projectId}).fetch();
            states.unshift({name: 'BackLog', _id: null});
            states.push({name: 'Done', _id: '1'});
            story.states = states.map(function(status) {
                if (status._id) {
                    notes = Note.find({story:story._id, statusId: status._id}).map(function(note) {
                        note.owner = Meteor.users.findOne(note.owner);
                        return note;
                    });
                } else {
                    notes = Note.find({story:story._id, $or: [{statusId: status._id}, {statusId: ''}]}).map(function(note) {
                        note.owner = Meteor.users.findOne(note.owner);
                        return note;
                    });
                }
                status.notes = notes;
                return status;
            });
            return story;
        });
        return stories;
    },
    //invite: function (partyId, userId) {
    //    check(partyId, String);
    //    check(userId, String);
    //    var party = Messages.findOne(partyId);
    //    if (!party)
    //        throw new Meteor.Error(404, "No such party");
    //    if (party.owner !== this.userId)
    //        throw new Meteor.Error(404, "No such party");
    //    if (party.public)
    //        throw new Meteor.Error(400,
    //            "That party is public. No need to invite people.");
    //
    //    if (userId !== party.owner && ! _.contains(party.invited, userId)) {
    //        Messages.update(partyId, { $addToSet: { invited: userId } });
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
    //    var party = Messages.findOne(partyId);
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
    //            Messages.update(
    //                {_id: partyId, "rsvps.user": this.userId},
    //                {$set: {"rsvps.$.rsvp": rsvp}});
    //        } else {
    //            // minimongo doesn't yet support $ in modifier. as a temporary
    //            // workaround, make a modifier that uses an index. this is
    //            // safe on the client since there's only one thread.
    //            var modifier = {$set: {}};
    //            modifier.$set["rsvps." + rsvpIndex + ".rsvp"] = rsvp;
    //            Messages.update(partyId, modifier);
    //        }
    //        // Possible improvement: send email to the other people that are
    //        // coming to the party.
    //    } else {
    //        // add new rsvp entry
    //        Messages.update(partyId,
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