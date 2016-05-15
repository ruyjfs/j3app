//Meteor.publish("message", function (contactId) {
Meteor.publish("story", function (projectId, options, searchString, trash) {
//    Message.cancel();

    if (this.userId && projectId){
        selector = {$or: [{projectId: projectId}, {projectId: null}]};


        if (trash == true) {
            selector = {trash: true, $or: [{projectId: projectId}, {projectId: null}]};
        } else if (trash == false) {
            selector = {$and: [{$or: [{projectId: projectId}, {projectId: null}]}, {$or: [{trash: false}, {trash: null}]}]};
        } else {
            selector = {$or: [{projectId: projectId}, {projectId: null}]};
        }

        if (typeof searchString === 'string' && searchString.length) {
            selector.name = {
                $regex:  `.*${searchString}.*`,
                $options : 'i'
            };
        }
        Counts.publish(this, 'totalStory', Story.find(selector), {
            noReady: true
        });
        result = Story.find(selector, options);
        return (result)? result : [];
    } else {
        return [];
    }

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