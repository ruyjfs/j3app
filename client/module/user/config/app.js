if (Meteor.isClient) {
    angular.module('user',[
        'angular-meteor',
        'ui.router',
        'angularUtils.directives.dirPagination',
        'uiGmapgoogle-maps',
        'ngMaterial'
    ]);

    var themeIcons = ['$mdIconProvider' , function ($mdIconProvider) {
        $mdIconProvider
            .iconSet("social", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg")
            .iconSet("action", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg")
            .iconSet("communication", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg")
            .iconSet("content", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg")
            .iconSet("toggle", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-toggle.svg")
            .iconSet("navigation", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg")
            .iconSet("image", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg");

            //$mdThemingProvider.theme('driver')
            //    .primaryPalette('grey', {
            //        'default': '500',
            //    })
            //    .warnPalette('red', {
            //        'default': '900',
            //    })
            //    .accentPalette('orange', {
            //        'default': 'A700',
            //    });
            //
            //$mdThemingProvider.setDefaultTheme('driver');
            //
            //$mdThemingProvider.alwaysWatchTheme(true);
    }];
    //
    angular.module('user').config(themeIcons);

    //angular.module('user')
    //.config(function($mdThemingProvider){
    //    $mdThemingProvider.theme('default')
    //        //.dark()
    //        .primaryPalette('grey', {
    //            'default': '900',
    //        })
    //        .warnPalette('red', {
    //            'default': '900',
    //        })
    //        .accentPalette('orange', {
    //            'default': 'A700',
    //        });
    //
    //$mdThemingProvider.setDefaultTheme('default');
    //$mdThemingProvider.alwaysWatchTheme(true);
    //});


    //var themeIcons = ['$mdIconProvider' , function ($mdIconProvider) {

        //$mdIconProvider
        //    .iconSet("social", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg")
        //    .iconSet("action", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg")
        //    .iconSet("communication", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg")
        //    .iconSet("content", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg")
        //    .iconSet("toggle", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-toggle.svg")
        //    .iconSet("navigation", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg")
        //    .iconSet("image", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg");

        //$mdThemingProvider.theme('user')
        //            .dark()
        //            .primaryPalette('grey', {
        //                'default': '900',
        //            })
        //            .warnPalette('red', {
        //                'default': '900',
        //            })
        //            .accentPalette('orange', {
        //                'default': 'A700',
        //            });
        //
        //        //$mdThemingProvider.setDefaultTheme('default');
        //        //
        //        //$mdThemingProvider.alwaysWatchTheme(true);

    //}];

    //angular.module('socially').config(themeIcons);
    //
    //angular.module('user')
    //    .config(function($mdThemingProvider){
    //        $mdThemingProvider.theme('user')
    //            .dark()
    //            .primaryPalette('grey', {
    //                'default': '900',
    //            })
    //            .warnPalette('red', {
    //                'default': '900',
    //            })
    //            .accentPalette('orange', {
    //                'default': 'A700',
    //            });
    //
    //        //$mdThemingProvider.setDefaultTheme('default');
    //        //
    //        //$mdThemingProvider.alwaysWatchTheme(true);
    //    });

    //angular.module('brotherhood')
    //    .config(function($mdThemingProvider) {
    //        $mdThemingProvider.theme('altTheme')
    //            .primaryPalette('purple'),
    //
    //                $mdThemingProvider.theme('altTheme')
    //                    .primaryPalette('purple')
    //             // specify primary color, all
    //        // other color intentions will be inherited
    //        // from default
    //    });

    //angular.module('brotherhood')
    //    .config(function($mdThemingProvider) {
    //        $mdThemingProvider.theme('altTheme')
    //            .primaryPalette('purple') // specify primary color, all
    //        // other color intentions will be inherited
    //        // from default
    //    });

    //$mdThemingProvider.setDefaultTheme('altTheme');


    //$mdThemingProvider.alwaysWatchTheme(true);

}