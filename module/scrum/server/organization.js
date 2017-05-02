//Meteor.publish("message", function (contactId) {
Meteor.publish("organization", function (options) {
    if (this.userId){
        //teamsId = Team.find({$or: [{members: this.userId}, {userId: this.userId}]}).map(function (member) {
        //    return member._id;
        //});
        selector = {
            $or: [
                {userId: this.userId},
                {members: this.userId},
        //        {scrumMaster: {$in: [this.userId]}},
        //        {productOwner: {$in: [this.userId]}}
            ]
        };
        //Counts.publish(this, 'total', Team.find(selector), {
        //    noReady: true
        //});


        result = Organization.find(selector, options);
        // Counts.publish(this, 'totalOrganization', result, {
        //     noReady: true
        // });

        return (result)? result : [];
    } else {
        return [];
        // return this.ready();
    }






//    Message.cancel();

    //if (limit) {
    //    limit = {limit: limit};
    //} else {
    //    limit = {};
    //}
    //
    //result = Project.find({
    //    //'owner' : $rootScope.currentUser._id,
    //    //'owner': this.userId,
    //    //'contactId': contactId
    //}, limit);
    //console.log('_____________________________________________________________________');
    //console.log('Firend: ' + contactId);
    //console.log('UserId: ' + this.userId);
    //console.log('Quantidade: ' + result);
    //organizationsNew = [];
    //result = Project.find({});
    //organizations.forEach(function(organization){
    //    console.log(organization);
    //    //if (this.userId && this.userId != Meteor.user()._id) {
    //    //    if (this.teams) {
    //    //        teams = Team.find(
    //    //            {
    //    //                _id: { $in: this.teams},
    //    //                $and: [{'members' : Meteor.user()._id}]
    //    //            });
    //    //        if (teams.fetch().length > 0) {
    //    //            console.log(this);
    //    //            organizationsNew.push(this);
    //    //        }
    //    //    }
    //    //} else if (this) {
    //        organizationsNew.push(organization);
    //    //}
    //});
    //return (result)? result : {};
    //return Message.find({
    //    'owner': this.userId,
    //    'contactId': contactId
    //});

    //if (searchString == null)
    //    searchString = '';
    //
    //Counts.publish(this, 'numberOfMessages', Message.find({
    //    'name' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },
    //    $or:[
    //        //{$and:[
    //        //    {'public': true},
    //        //    {'public': {$exists: true}}
    //        //]},
    //        {$and:[
    //            {owner: this.userId},
    //            {owner: {$exists: true}}
    //        ]}
    //        //{$and:[
    //        //    {invited: this.userId},
    //        //    {invited: {$exists: true}}
    //        //]}
    //    ]}), { noReady: true });
    //
    //return Message.find({
    //    'name' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },
    //    $or:[
    //    //    //{$and:[
    //    //    //    {"public": true},
    //    //    //    {"public": {$exists: true}}
    //    //    //]},
    //        {$and:[
    //            {owner: this.userId},
    //            {owner: {$exists: true}}
    //        ]}
    //    //    //{$and:[
    //    //    //    {invited: this.userId},
    //    //    //    {invited: {$exists: true}}
    //    //    //]}
    //    ]
    //}, options);
});