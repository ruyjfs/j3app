//Meteor.publish("message", function (contactId) {
Meteor.publish("sprint", function (projectId, options, searchString) {
    if (this.userId && projectId){
        selector = {$or: [{projectId: projectId}, {projectId: null}]};
        if (typeof searchString === 'string' && searchString.length) {
            selector.number = parseInt(searchString);
        }
        Counts.publish(this, 'totalSprint', Sprint.find(selector), {
            noReady: true
        });
        result = Sprint.find(selector, options);
        return (result)? result : [];
    } else if (this.userId) {
        //result = Sprint.find(selector, options);
        //return result;
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