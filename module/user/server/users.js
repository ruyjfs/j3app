Meteor.publish('userStatus', function() {
    return Meteor.users.find({});
});
Meteor.publish("users", function (strSearch, options) {

    Counts.publish(this, 'totalUser', Team.find(selector), {
        noReady: true
    });

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

    return Meteor.users.find(selector, options);
});