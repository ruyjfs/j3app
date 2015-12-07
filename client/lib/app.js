if (Meteor.isClient) {

    function onReady() {
        angular.bootstrap(document,
            [
                'admin',
                'user',
                'gamer',
                'driver',
                'socially',
                'brotherhood',
                'scrum',
            ]);
    }

    mdThemingProvider = '';
    theme = ['$mdIconProvider', '$mdThemingProvider' , function ($mdIconProvider, $mdThemingProvider) {
        $mdIconProvider
            .iconSet("social", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg")
            .iconSet("action", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg")
            .iconSet("communication", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg")
            .iconSet("content", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg")
            .iconSet("toggle", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-toggle.svg")
            .iconSet("navigation", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg")
            .iconSet("image", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg");

        $mdThemingProvider.theme('admin')
            .dark()
            .primaryPalette('grey', {
                'default': '900',
            })
            .warnPalette('red', {
                'default': '900',
            })
            .accentPalette('green', {
                'default': 'A700',
            });

        $mdThemingProvider.theme('brotherhood')
            .primaryPalette('grey', {
                'default': '900',
            })
            .warnPalette('red', {
                'default': '900',
            })
            .accentPalette('orange', {
                'default': 'A700',
            });


        $mdThemingProvider.theme('driver')
            .primaryPalette('grey', {
                'default': '500',
            })
            .warnPalette('red', {
                'default': '900',
            })
            .accentPalette('orange', {
                'default': 'A700',
            });

        $mdThemingProvider.theme('gamer')
            .primaryPalette('red', {
                'default': '800',
            })
            .warnPalette('red', {
                'default': '900',
            })
            .accentPalette('orange', {
                'default': 'A700',
            });

        $mdThemingProvider.theme('scrum')
            .primaryPalette('brown', {
                'default': '700',
            })
            .warnPalette('red', {
                'default': '900',
            })
            .accentPalette('orange', {
                'default': 'A700',
            });

        $mdThemingProvider.theme('user')
            .primaryPalette('orange', {
                'default': 'A700',
            })
            .warnPalette('red', {
                'default': '900',
            })
            .accentPalette('green', {
                'default': '700',
            });

        $mdThemingProvider.theme('parties')
            .primaryPalette('orange', {
                'default': 'A700',
            })
            .warnPalette('red', {
                'default': '900',
            })
            .accentPalette('green', {
                'default': '700',
            });

        $mdThemingProvider.setDefaultTheme('admin');

        mdThemingProvider = $mdThemingProvider;
        $mdThemingProvider.alwaysWatchTheme(true);
    }];

    nameModule = '';
    setTheme = function ($nameTheme){
        nameModule = $nameTheme;
        mdThemingProvider.setDefaultTheme($nameTheme);
    };


    getUserLanguage = function () {
        // Put here the logic for determining the user language
        return "pt-BR";
    };
    Meteor.startup(function () {
        Session.set("showLoadingIndicator", true);
        TAPi18n.setLanguage(getUserLanguage())
            .done(function () {
                Session.set("showLoadingIndicator", false);
            })
            .fail(function (error_message) {
                // Handle the situation
                console.log(error_message);
            });
    });


    //
    //var themeIcons = ['$mdIconProvider' , function ($mdIconProvider) {
    //    $mdIconProvider
    //        .iconSet("social", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg")
    //        .iconSet("action", "/packages/planettraining_material-desilgn-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg")
    //        .iconSet("communication", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg")
    //        .iconSet("content", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg")
    //        .iconSet("toggle", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-toggle.svg")
    //        .iconSet("navigation", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg")
    //        .iconSet("image", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg");
    //}];

    //angular.module('user').config(themeIcons);
    //angular.module('user')
    //    .config(function($mdThemingProvider){
    //        $mdThemingProvider.theme('driver')
    //            .primaryPalette('grey', {
    //                'default': '500',
    //            })
    //            .warnPalette('red', {
    //                'default': '900',
    //            })
    //            .accentPalette('orange', {
    //                'default': 'A700',
    //            });
    //
    //        $mdThemingProvider.setDefaultTheme('driver');
    //        //
    //        //$mdThemingProvider.alwaysWatchTheme(true);
    //    });

    if (Meteor.isCordova)
        angular.element(document).on("deviceready", onReady);
    else
        angular.element(document).ready(onReady);
}