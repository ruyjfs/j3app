//Meteor.publish("message", function (contactId) {
Meteor.publish("project", function (limit) {
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
    projectsNew = [];
    result = Project.find({});
    //projects.forEach(function(project){
    //    console.log(project);
    //    //if (this.userId && this.userId != Meteor.user()._id) {
    //    //    if (this.teams) {
    //    //        teams = Team.find(
    //    //            {
    //    //                _id: { $in: this.teams},
    //    //                $and: [{'members' : Meteor.user()._id}]
    //    //            });
    //    //        if (teams.fetch().length > 0) {
    //    //            console.log(this);
    //    //            projectsNew.push(this);
    //    //        }
    //    //    }
    //    //} else if (this) {
    //        projectsNew.push(project);
    //    //}
    //});
    return (result)? result : {};
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