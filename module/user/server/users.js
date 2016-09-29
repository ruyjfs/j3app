Meteor.publish('userStatus', function() {
    return Meteor.users.find({});
});
Meteor.publish("users", function (strSearch, options) {


    selector = {};
    if (typeof strSearch === 'string' && strSearch.length) {
        selector.name = {
            $or: [
                    {name: {$regex:  `.*${strSearch}.*`, $options : 'i' }},
                    {lastName: {$regex:  `.*${strSearch}.*`, $options : 'i' }},
                    {email: {$regex:  `.*${strSearch}.*`, $options : 'i' }},
                    {emails: {address: {$regex:  `.*${strSearch}.*`, $options : 'i' }}},
                ]
            }
            //$regex:  `.*${searchString}.*`,

        $options : 'i'
    };

    Counts.publish(this, 'totalUser', Meteor.users.find(selector), {
        noReady: true
    });

    return Meteor.users.find(selector, options);
});