//Meteor.publish("message", function (contactId) {
Meteor.publish("sprint", function (projectId, options) {

    if (this.userId && projectId){
        selector = {$or: [{projectId: projectId}, {projectId: null}]};
        result = Sprint.find(selector, options);
        return (result)? result : [];
    } else {
        return [];
    }

//    Message.cancel();


    //result = Sprint.find({
        //'owner' : $rootScope.currentUser._id,
        //'owner': this.userId,
        //'contactId': contactId
    //}, limit);
    //console.log('_____________________________________________________________________');
    //console.log('Firend: ' + contactId);
    //console.log('UserId: ' + this.userId);
    //console.log('Quantidade: ' + result);
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