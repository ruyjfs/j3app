Note = new Mongo.Collection("note");
Note.allow({
    insert: function (userId) {
        //return userId && party.owner === userId;
        return userId;
    },
    update: function (userId, team) {
        //return userId && party.owner === userId;
        return userId;
    },
    remove: function (userId, party) {
        //return userId && party.owner === userId;
        return userId;
    }
});

Meteor.methods({
    noteSave: function(form){
        if (!form.userId) {
            form.userId = Meteor.userId();
        }

        if (form._id) {
            id = form._id;
            delete form._id;
            Note.update(id, { $set: form});
        } else {
            Note.insert(form);
        }
    },
    noteChangeStatus: function(form){
        var formNew = Note.findOne(form.noteId);
        formNew.statusId = form.statusId;
        id = form.noteId;
        delete formNew._id;
        Note.update(id, { $set: formNew});
    },
    noteFindBackLog: function(param){
        notes = Note.find({$or: [{projectId: param.projectId}, {projectId: null}]}).fetch();
        notes.map(function(note){
            note.story = Story.findOne(note.story);
            note.owner = Meteor.users.findOne(note.owner);
            return note;
        });
        return notes;
    },
    noteChangeSprint: function(form){
        var formNew = Note.findOne(form.noteId);
        formNew.sprintId = form.sprintId;
        id = form.noteId;
        delete formNew._id;
        Note.update(id, { $set: formNew});
    },
    noteFindBackLog: function(param){
        notes = Note.find({$or: [{projectId: param.projectId}, {projectId: null}]}).fetch();
        notes.map(function(note){
            note.story = Story.findOne(note.story);
            note.owner = Meteor.users.findOne(note.owner);
            return note;
        });
        return notes;
    },
    noteTrash: function(param){
        var arrData = Note.findOne(param.id);
        arrData.trash = param.trash;
        arrData.sprintId = null;
        delete arrData._id;
        Note.update(param.id, { $set: arrData});
    },
    noteDelete: function(param){
        notes = Note.find({$or: [{projectId: param.projectId}, {projectId: null}]}).fetch();
        notes.map(function(note){
            note.story = Story.findOne(note.story);
            note.owner = Meteor.users.findOne(note.owner);
            return note;
        });
        return notes;
    },
    //teamSave: function (dataForm) {
        //console.log(dataForm);
        //check(partyId, String);
        //check(userId, String);
        //var party = Message.findOne(partyId);
        //if (!party)
        //    throw new Meteor.Error(404, "No such party");
        //if (party.owner !== this.userId)
        //    throw new Meteor.Error(404, "No such party");
        //if (party.public)
        //    throw new Meteor.Error(400,
        //        "That party is public. No need to invite people.");
        //
        //if (userId !== party.owner && ! _.contains(party.invited, userId)) {
        //    Message.update(partyId, { $addToSet: { invited: userId } });
        //
        //    var from = contactEmail(Meteor.users.findOne(this.userId));
        //    var to = contactEmail(Meteor.users.findOne(userId));
        //
        //    if (Meteor.isServer && to) {
        //        // This code only runs on the server. If you didn't want clients
        //        // to be able to see it, you could move it to a separate file.
        //        Email.send({
        //            from: "noreply@socially.com",
        //            to: to,
        //            replyTo: from || undefined,
        //            subject: "PARTY: " + party.title,
        //            text:
        //            "Hey, I just invited you to '" + party.title + "' on Socially." +
        //            "\n\nCome check it out: " + Meteor.absoluteUrl() + "\n"
        //        });
        //    }
        //}
    //},
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