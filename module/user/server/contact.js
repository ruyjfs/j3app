//Meteor.publish("messages", function (friendId) {
Meteor.publish("contact", function (limit) {
//    Messages.cancel();

    if (limit) {
        limit = {limit: limit};
    } else {
        limit = {};
    }

    result = Contact.find({
        //'owner' : $rootScope.currentUser._id,
        //'owner': this.userId,
        //'friendId': friendId
    }, limit);
    //console.log('_____________________________________________________________________');
    //console.log('Firend: ' + friendId);
    //console.log('UserId: ' + this.userId);
    //console.log('Quantidade: ' + result);

    return result;

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