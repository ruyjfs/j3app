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
    sprintSave: function(param){
        if (!param.userId) {
            param.userId = Meteor.userId();
        }

        //moment.locale('pt-BR');
        //param.dateStart = moment(param.dateStart, 'L').format('x');
        //console.log(param.dateEnd);
        //param.dateEnd = moment(param.dateEnd, 'L').format('x');
        //console.log(param.dateEnd);
        //console.log(moment(param.dateEnd, 'L').format('x'));
        //console.log(param);

        if (param._id) {
            id = param._id;
            delete param._id;
            Sprint.update(id, { $set: param});
        } else {
            Sprint.insert(param);
        }
    },
    sprintCreate: function(projectId){
        project = Project.findOne(projectId);
        if (project) {
            sprint = Sprint.findOne(
                {$and: [{projectId: projectId}]}
            );

            if (!sprint) {
                moment.locale('pt-BR');
                sprint = {};
                //sprint.dateStart = moment().startOf('week').format('DD/MM/YYYY, HH:mm:ss');
                //sprint.dateStart = moment().startOf('week').format('DD/MM/YYYY');
                sprint.dateStart = moment().startOf('week')._d;

                //week = project.week;
                //if (week == 1) {
                //    week = week - 1;
                //}
                sprint.dateEnd = moment().endOf('week').add(project.week - 1, 'week')._d;
                //console.log(project.week);
                //console.log(moment().startOf('week'));
                //console.log(new Date());
                sprint.userId = Meteor.userId();
                sprint.projectId = projectId;
                sprint.number = 1;
                sprint.time = 0;
//console.log(sprint);
                //console.log(sprint);
                Sprint.insert(sprint);

                //sprint.date
                //    Sprint.insert(dataForm)
            }

            sprintNextNumber = sprint.number + 1;
            sprintNext = Sprint.findOne({projectId: projectId, number: sprintNextNumber});
            if (!sprintNext) {
                moment.locale('pt-BR');
                sprintNext = {};
                //sprint.dateStart = moment().startOf('week').format('DD/MM/YYYY, HH:mm:ss');
                //sprint.dateStart = moment().startOf('week').format('DD/MM/YYYY');

                if (typeof(sprintNext.dateStart) === 'string') {
                    sprintNext.dateStart = moment(sprint.dateEnd, 'x').startOf('week').add(1, 'week')._d;
                    sprintNext.dateEnd = moment(sprint.dateEnd, 'x').endOf('week').add(project.week, 'week')._d;
                } else {
                    sprintNext.dateStart = moment(sprint.dateEnd).startOf('week').add(1, 'week')._d;
                    sprintNext.dateEnd = moment(sprint.dateEnd).endOf('week').add(project.week, 'week')._d;
                }
                //console.log(project.week);
                //console.log(moment().startOf('week'));
                //console.log(new Date());
                sprintNext.time = 0;
                sprintNext.userId = Meteor.userId();
                sprintNext.projectId = projectId;
                sprintNext.number = sprintNextNumber;
                //console.log(sprint);
                //console.log(sprintNext);
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
    sprintFindNext: function(param){
        dateNowX = moment().format('x');
        dateNow = new Date();
        if (param.sprintId != '1') {
            sprint = Sprint.findOne({projectId: param.projectId, _id: param.sprintId});
        } else {
            sprint = Sprint.findOne(
                {
                    $and: [
                        {projectId: param.projectId},
                        {
                            $or: [{dateStart: {$lte: dateNowX}, dateEnd: {$gte: dateNowX}}, {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}]
                        }
                    ]
                }
            );
        }
        sprintNext = {};
        if (sprint) {
            sprintNextNumber = sprint.number + 1;
            sprintNext = Sprint.findOne({projectId: param.projectId, number: sprintNextNumber});

            if (sprintNext) {
                if (typeof(sprintNext.dateStart) === 'string') {
                    sprintNext.dateStartTreated = moment(sprintNext.dateStart, 'x').format('L');
                    sprintNext.dateEndTreated = moment(sprintNext.dateEnd, 'x').format('L');
                } else {
                    sprintNext.dateStartTreated = moment(sprintNext.dateStart).format('L');
                    sprintNext.dateEndTreated = moment(sprintNext.dateEnd).format('L');
                }
            } else {
                moment.locale('pt-BR');
                sprintNext = {};
                project = Project.findOne(param.projectId);
                if (typeof(sprintNext.dateStart) === 'string') {
                    sprintNext.dateStart = moment(sprint.dateEnd, 'x').startOf('week').add(1, 'week')._d;
                    sprintNext.dateEnd = moment(sprint.dateEnd, 'x').endOf('week').add(project.week, 'week')._d;
                } else {
                    sprintNext.dateStart = moment(sprint.dateEnd).startOf('week').add(1, 'week')._d;
                    sprintNext.dateEnd = moment(sprint.dateEnd).endOf('week').add(project.week, 'week')._d;
                }
                sprintNext.userId = Meteor.userId();
                sprintNext.projectId = param.projectId;
                sprintNext.number = sprintNextNumber;
                sprintNext.time = 0;
                Sprint.insert(sprintNext);
            }
        }
        return sprintNext;
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