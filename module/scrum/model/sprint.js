Sprint = new Mongo.Collection("sprint");
Sprint.allow({
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
//yemiX6y3u7vnqpS3n
//92okH9HNck243cdQ5
Meteor.methods({
    sprintCreate: function(projectId){
        project = Project.findOne(projectId);
        if (project) {
            sprint = Sprint.findOne(
                {$and: [{projectId: projectId}]}
            );

            if (!sprint) {
                moment.locale('en');
                sprint = {};
                //sprint.dateStart = moment().startOf('week').format('DD/MM/YYYY, HH:mm:ss');
                //sprint.dateStart = moment().startOf('week').format('DD/MM/YYYY');
                sprint.dateStart = moment().startOf('week').format('x');
                sprint.dateEnd = moment().endOf('week').add(project.week, 'week').format('x');
                //console.log(project.week);
                //console.log(moment().startOf('week'));
                //console.log(new Date());
                sprint.userId = Meteor.userId();
                sprint.projectId = projectId;
                sprint.number = 1;
                //console.log(sprint);
                Sprint.insert(sprint);

                //sprint.date
                //    Sprint.insert(dataForm)
            }

            sprintNextNumber = sprint.number + 1;
            sprintNext = Sprint.findOne({projectId: projectId, number: sprintNextNumber});
            if (!sprintNext) {
                moment.locale('en');
                sprintNext = {};
                //sprint.dateStart = moment().startOf('week').format('DD/MM/YYYY, HH:mm:ss');
                //sprint.dateStart = moment().startOf('week').format('DD/MM/YYYY');
                sprintNext.dateStart = moment().startOf('week').add(project.week + 1, 'week').format('x');
                sprintNext.dateEnd = moment().endOf('week').add(project.week + project.week, 'week').format('x');
                //console.log(project.week);
                //console.log(moment().startOf('week'));
                //console.log(new Date());
                sprintNext.userId = Meteor.userId();
                sprintNext.projectId = projectId;
                sprintNext.number = sprintNextNumber;
                //console.log(sprint);
                Sprint.insert(sprintNext);
            }

            return sprint;
        } else {
            return false;
        }
        //if (!dataForm.userId) {
        //    dataForm.userId = Meteor.userId();
        //}
        //
        //if (dataForm._id) {
        //    Status.update(dataForm._id, { $set: dataForm});
        //} else {
        //    Status.insert(dataForm);
        //}
    },
    //sprintCurrent: function(projectId){
    //    sprint = Sprint.findOne(
    //        {$and: [{projectId: projectId}]}
    //    );
    //    sprint.dateStartTreated = moment.unix(sprint.dateStart).calendar('L');
    //    sprint.dateEndTreated = moment.unix(sprint.dateEnd).calendar('L');
    //    console.log(sprint);
    //    console.log('sprint');
    //    return sprint;
    //},
    //sprintFindAllByProject: function(projectId){
    //    console.log(projectId);
    //    sprint = Sprint.find(
    //        {$and: [{projectId: projectId}]}
    //    ).fetch().map(function(sprint){
    //            sprint.dateStartTreated = moment.unix(sprint.dateStart).calendar('L');
    //            sprint.dateEndTreated = moment.unix(sprint.dateEnd).calendar('L');
    //            return sprint;
    //        });
    //    return sprint;
    //}
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