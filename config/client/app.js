if (Meteor.isClient) {

    function onReady() {
        angular.bootstrap(document,
            [
                'user',
                'admin',
                'gamer',
                'driver',
                'socially',
                'brotherhood',
                'scrum',
            ]);

        $('.nav-button-left').sideNav({
            closeOnClick: false,
            edge: 'left'
        });
        $('.nav-button-right').sideNav({
            closeOnClick: false,
            edge: 'right',
        });
        $('.nav-button-close-left').sideNav({
            closeOnClick: true,
            edge: 'left'
        });
        $('.nav-button-close-right').sideNav({
            closeOnClick: true,
            edge: 'right',
        });
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
                'default': '800',
            });

        $mdThemingProvider.theme('user')
            .primaryPalette('orange', {
                'default': '800',
            })
            .warnPalette('red', {
                'default': '900',
            })
            .accentPalette('green', {
                'default': '700',
            });

        $mdThemingProvider.theme('parties')
            .primaryPalette('orange', {
                'default': '800',
            })
            .warnPalette('red', {
                'default': '900',
            })
            .accentPalette('green', {
                'default': '700',
            });

        $mdThemingProvider.setDefaultTheme('scrum');
        mdThemingProvider = $mdThemingProvider;
        $mdThemingProvider.alwaysWatchTheme(true);
    }];

    angular.module('admin').config(theme);

    nameModule = '';
    titleMiddle = '';
    themeMaterialize = 'orange darken-4';
    setTheme = function ($nameTheme){
        nameModule = $nameTheme;
        mdThemingProvider.setDefaultTheme($nameTheme);
        switch (nameModule){
            case 'user' :
                themeMaterialize = 'orange darken-3';
                break;
            case 'admin' :
                themeMaterialize = 'grey darken-4';
                break;
            case 'brotherhood' :
                themeMaterialize = 'grey darken-4';
                break;
            case 'scrum' :
                themeMaterialize = 'brown darken-3';
                break;
            case 'gamer' :
                themeMaterialize = 'red darken-3';
                break;
            case 'driver' :
                themeMaterialize = 'grey';
                break;
            default:
                themeMaterialize = 'orange darken-3';
                break;
        }
    };

    isPermission = function() {
        if (Meteor.userId()) {
            return false;
        } else {
            return false;
        }
    }

//console.log('pt');
    moment.locale('pt-BR');
    moment.createFromInputFallback = function(config) { config._d = new Date(config._i); };
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