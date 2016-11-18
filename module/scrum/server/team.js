//Meteor.publish("message", function (contactId) {
Meteor.publish("team", function (organizationId, options, searchString) {
    if (this.userId){
        if (organizationId && organizationId != 'organization') {
            var organization = Organization.findOne({'namespace': organizationId});
            if (organization) {
                organizationId = organization._id;
            }
            selector = {
                $or: [
                    {'userId': this.userId},
                    {'members': this.userId}
                ],
                // $and: [{$or: [{organization: null}, {organization: ''}, {organization: organizationId}]}]
                $and: [{organization: organizationId}]
            };
        } else if (organizationId == 'organization') {
            selector = {
                $or: [
                    {'userId': this.userId},
                    {'members': this.userId}
                ],
                $and: [{$or: [{organization: null}, {organization: ''}]}]
            };
        } else {
            selector = {
                //$or: [
                //    {'userId' : this.userId},
                //    {'members' : this.userId}
                //],
                //$and: [{$or: [{organization: null}, {organization: ''}]}]
            };
        }

        if (typeof searchString === 'string' && searchString.length) {
                selector.name = {
                    $regex:  `.*${searchString}.*`,
                $options : 'i'
            };
        }

        Counts.publish(this, 'totalTeam', Team.find(selector), {
            noReady: true
        });

        result = Team.find(selector, options);
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