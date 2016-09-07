//Meteor.publish("message", function (contactId) {
Meteor.publish("note", function (projectId, options, searchString, trash) {
    if (this.userId && projectId){
        var project = Project.findOne({'namespace': projectId});
        if (project) {
            projectId = project._id;
        }
        if (trash == true) {
            selector = {trash: true, $or: [{projectId: projectId}, {projectId: null}]};
        } else if (trash == false) {
            selector = {$and: [{$or: [{projectId: projectId}, {projectId: null}]}, {$or: [{trash: false}, {trash: null}]}]};
        } else {
            selector = {$or: [{projectId: projectId}, {projectId: null}]};
        }

        if (typeof searchString === 'string' && searchString.length) {
            selector.description = {
                $regex:  `.*${searchString}.*`,
                $options: 'i'
            }
        }
        result = Note.find(selector, options);
        return (result)? result : [];
    } else {
        return [];
    }

    //var result = [];
    //Note.find({
    //    //'owner' : $rootScope.currentUser._id,
    //    //'owner': this.userId,
    //    //'contactId': contactId
    //}, limit).forEach(
    //    function (note, keyNote) {
    //        //note.story = Story.findOne(note.story);
    //        //result[keyNote] = note;
    //        //console.log(note);
    //
    //        console.log(note);
    //        console.log(keyNote);
    //
    //        //console.log(note);
    //        //return note;
    //        //note.story = $meteor.object(Story, note.story, false);
    //        //newBook.lendings = db.lendings.find( { "book": newBook._id  } ).toArray();
    //        //newBook.authors = db.authors.find( { "_id": { $in: newBook.authors }  } ).toArray();
    //        //db.booksReloaded.insert(newBook);
    //    }
    //);
    //console.log(result);
    //console.log('_____________________________________________________________________');
    //console.log('Firend: ' + contactId);
    //console.log('UserId: ' + this.userId);
    //console.log('Quantidade: ' + result);
    //console.log('Quantidade: ' + result);

    //console.log(result);
//console.log(result);

    result = Note.find({}, limit);
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