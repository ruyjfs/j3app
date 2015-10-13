//
//console.log(Meteor.);
//
//Meteor.onUse(function (api) {
//    console.log(api)
//    api.use(["tap:i18n@1.7.0"], ["client", "server"]);

    // You must load your package's package-tap.i18n before you load any
    // template
    //api.add_files("ngMaterial-tap.i18n", ["client", "server"]);

    // Templates loads (if any)

    // List your languages files so Meteor will watch them and rebuild your
    // package as they change.
    // You must load the languages files after you load your templates -
    // otherwise the templates won't have the i18n capabilities (unless
    // you'll register them with tap-i18n yourself, see below).
    //api.add_files([
    //    //"i18n/en.i18n.json",
    //    //"i18n/fr.i18n.json",
    //    //"i18n/pt.i18n.json",
    //    "pt-BR.i18n.json"
    //], ["client", "server"]);
//});