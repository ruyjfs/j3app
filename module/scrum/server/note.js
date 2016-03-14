//Meteor.publish("message", function (contactId) {
Meteor.publish("note", function (limit) {
//    Message.cancel();

    if (limit) {
        limit = {limit: limit};
    } else {
        limit = {};
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
    return result;

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