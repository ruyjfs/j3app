if (Meteor.isClient) {
    angular.module('tec',[
        'angular-meteor',
        'ui.router',
        'angularUtils.directives.dirPagination',
        'uiGmapgoogle-maps',
        'ngMaterial'
    ]);
//
//
//    //angular.module('tec')
//    //    .config(function($mdThemingProvider){
//    //        $mdThemingProvider.theme('tec')
//    //            .primaryPalette('grey', {
//    //                'default': '500',
//    //            })
//    //            .warnPalette('red', {
//    //                'default': '900',
//    //            })
//    //            .accentPalette('orange', {
//    //                'default': 'A700',
//    //            });
//    //
//    //        //$mdThemingProvider.setDefaultTheme('tec');
//    //        //
//    //        //$mdThemingProvider.alwaysWatchTheme(true);
//    //    });
//
//    //angular.module('brotherhood')
//    //    .config(function($mdThemingProvider) {
//    //        $mdThemingProvider.theme('altTheme')
//    //            .primaryPalette('purple'),
//    //
//    //                $mdThemingProvider.theme('altTheme')
//    //                    .primaryPalette('purple')
//    //             // specify primary color, all
//    //        // other color intentions will be inherited
//    //        // from default
//    //    });
//
//    //angular.module('brotherhood')
//    //    .config(function($mdThemingProvider) {
//    //        $mdThemingProvider.theme('altTheme')
//    //            .primaryPalette('purple') // specify primary color, all
//    //        // other color intentions will be inherited
//    //        // from default
//    //    });
//
//    //$mdThemingProvider.setDefaultTheme('altTheme');
//
//
//    //$mdThemingProvider.alwaysWatchTheme(true);
//
}