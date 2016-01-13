//Meteor.publish("messages", function (friendId) {
Meteor.publish("project", function (limit) {
//    Messages.cancel();

    //if (limit) {
    //    limit = {limit: limit};
    //} else {
    //    limit = {};
    //}
    //
    //result = Project.find({
    //    //'owner' : $rootScope.currentUser._id,
    //    //'owner': this.userId,
    //    //'friendId': friendId
    //}, limit);
    //console.log('_____________________________________________________________________');
    //console.log('Firend: ' + friendId);
    //console.log('UserId: ' + this.userId);
    //console.log('Quantidade: ' + result);
    projectsNew = [];
    projects = Project.find({});
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
    return projects;
    //return Messages.find({
    //    'owner': this.userId,
    //    'friendId': friendId
    //});

    //if (searchString == null)
    //    searchString = '';
    //
    //Counts.publish(this, 'numberOfMessages', Messages.find({
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
    //return Messages.find({
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