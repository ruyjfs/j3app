if (Meteor.isClient) {
    angular.module('scrum',[
        'angular-meteor',
        'angular-meteor.auth',
        'ui.router',
        'angularUtils.directives.dirPagination',
        'uiGmapgoogle-maps',
        'ngMaterial',
        //'ng-sortable'
    ]);


    //angular.module('scrum')
    //    .config(function($mdThemingProvider){
    //        $mdThemingProvider.theme('scrum')
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