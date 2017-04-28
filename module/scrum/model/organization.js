Organization = new Mongo.Collection("organization");
Organization.allow({
    insert: function () {
        //return userId && party.owner === userId;
        return true;
    },
    update: function (userId, party, fields, modifier) {
        //return userId && party.owner === userId;
        return true;
    },
    remove: function (userId, party) {
        //return userId && party.owner === userId;
        return true;
    }
});
//yemiX6y3u7vnqpS3n
//92okH9HNck243cdQ5
Meteor.methods({
    organizationSave: (dataForm) => {
        if (
                (!dataForm.name) ||
                (!dataForm.namespace)
        ) {
           throw new Meteor.Error('required', 'Tell us the all information needed!');
        }

        if (dataForm._id) {
            console.info('tem id');
        //     where = {$and: [{namespace: $scope.form.namespace}], _id: {$not: id}};
        } else {
            console.info('nao tem id');
        //     where = {$and: [{namespace: $scope.form.namespace}]};
        }
        // spacenameExist = Organization.findOne(where);
        // console.info(spacenameExist);
        //
        // if (spacenameExist) {
        //     Materialize.toast('Erro: ' + 'Namespace already exists', 4000);



        // if (!dataForm.userId) {
        //     dataForm.userId = Meteor.userId();
        // }
        //
        // if (dataForm._id) {
        //     id = dataForm._id;
        //     delete dataForm._id;
        //     Organization.update(id, { $set: dataForm});
        // } else {
        //     Organization.insert(dataForm);
        // }
    },
    organizationSaveMembers: function(dataFormNew)
    {
        id = dataFormNew._id;
        dataForm = Organization.findOne(id);
        if (typeof(dataForm.members) !== 'undefined') {
            dataForm.members = dataFormNew.members.concat(dataForm.members).unique();
        } else {
            dataForm.members = dataFormNew.members;
        }
        delete dataForm._id;
        Organization.update(id, { $set: dataForm});
    },
    organizationUpdateMembers: function(dataFormNew)
    {
        id = dataFormNew._id;
        dataForm = Organization.findOne(id);
        dataForm.members = dataFormNew.members;
        delete dataForm._id;
        Organization.update(id, { $set: dataForm});
    },
    organizationDelete: function(id){
        Organization.remove(id);
    },
    getOrganizationByUser: function(id) {
        organizationsNew = [];
        organizations = Organization.find({});
        //organizations.forEach(function(organization, organizationKey){
        //    if (organization.userId != id) {
        //        organization.teams = Team.find(
        //            {
        //                _id: { $in: [organization.teams] },
        //                $and: [{'members' : Meteor.user()._id}]
        //            });
        //
        //        //organization.teams.filter({members: Meteor.user()._id});
        //        if (organization.teams) {
        //            organizationsNew[organizationKey] = organization;
        //        }
        //    } else {
        //        organizationsNew[organizationKey] = organization;
        //    }
        //
        //    //note.owner = Meteor.users.findOne(note.owner);
        //    //teste = note.owner.name.split(' ');
        //    //console.log(teste);
        //    //note.owner.firstName = note.owner.name.substring(0, note.owner.name.trim().search(' '));
        //    //organizationsNew[organizationKey] = organization;
        //});
        //return organizationsNew;
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