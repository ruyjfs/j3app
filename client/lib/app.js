if (Meteor.isClient) {

    function onReady() {
        angular.bootstrap(document,
            [
                'user',
                'scrum',
                'gamer',
                'driver',
                'socially',
                'brotherhood'
            ]);
    }
    //
    //var themeIcons = ['$mdIconProvider' , function ($mdIconProvider) {
    //    $mdIconProvider
    //        .iconSet("social", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg")
    //        .iconSet("action", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg")
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