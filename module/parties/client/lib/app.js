if (Meteor.isClient) {
    angular.module('socially',[
        'angular-meteor',
        'ui.router',
        'angularUtils.directives.dirPagination',
        'uiGmapgoogle-maps',
        'ngMaterial'
    ]);
    //
    //angular.module('socially')
    //    .config(function($mdThemingProvider) {
    //        $mdThemingProvider.theme('altTheme')
    //            .primaryPalette('purple') // specify primary color, all
    //        // other color intentions will be inherited
    //        // from default
    //    });
    //
    //$mdThemingProvider.setDefaultTheme('altTheme');
    //
    //
    //$mdThemingProvider.alwaysWatchTheme(true);
    //angular.module('socially')
    //    .config(function($mdThemingProvider){
    //    $mdThemingProvider.theme('orange')
    //        .dark()
    //        .primaryPalette('orange', {
    //            'default': '900',
    //        })
    //        .warnPalette('red', {
    //            'default': '900',
    //        })
    //        .accentPalette('orange', {
    //            'default': 'A700',
    //        });
    //});

    //angular.module('socially')
    //    .config(function($mdThemingProvider){
    //        $mdThemingProvider.theme('parties')
    //            .dark()
    //            .primaryPalette('orange', {
    //                'default': '900',
    //            })
    //            .warnPalette('red', {
    //                'default': '900',
    //            })
    //            .accentPalette('brown', {
    //                'default': 'A700',
    //            });
    //
    //        //$mdThemingProvider.setDefaultTheme('parties');
    //        //
    //        //$mdThemingProvider.alwaysWatchTheme(true);
    //    });


}