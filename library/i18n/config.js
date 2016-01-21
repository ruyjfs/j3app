getUserLanguage = function () {
    //var Cookie = require('cookie');
    //var language = Cookie.get("language");
    //
    //// Put here the logic for determining the user language
    //if (language) {
    //    return language;
    //} else {
        return "pt-BR";
    //}
};

setUserLanguage = function (language){
    TAPi18n.setLanguage(language)
        .done(function () {
            Session.set("showLoadingIndicator", false);
            Cookie.set('language', language);
        })
        .fail(function (error_message) {
            // Handle the situation
            console.log(error_message);
        });
};

if (Meteor.isClient) {
    Meteor.startup(function () {
        Session.set("showLoadingIndicator", true);

        //autorun();
        TAPi18n.setLanguage(getUserLanguage())
            .done(function () {
                Session.set("showLoadingIndicator", false);
            })
            .fail(function (error_message) {
                // Handle the situation
                console.log(error_message);
            });
    });
}