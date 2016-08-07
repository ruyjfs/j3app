//angular.module("brotherhood").run(['$rootScope', '$state', function($rootScope, $state) {
//    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
//        // We can catch the error thrown when the $requireUser promise is rejected
//        // and redirect the user back to the main page
//        if (error === 'AUTH_REQUIRED') {
//            $state.go('brotherhood');
//        }
//    });
//}]);
//
angular.module('brotherhood').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function ($urlRouterProvider, $stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        var $header = 'module/brotherhood/client/view/header.ng.html';
        var $footer = 'module/brotherhood/client/view/footer.ng.html';

        $stateProvider
            .state('brotherhood', {
                url: '/brotherhood',
                resolve: {
                    paralax: function(){
                        setTimeout(function(){
                            $('.parallax').parallax();
                        }, 200);
                    }
                },
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "main": {
                        templateUrl: 'module/brotherhood/client/view/default.ng.html',
                        controller: 'DefaultCtrl'
                    },
                    //"footer": {
                    //    templateUrl: $footer,
                    //}
                }
            });

        //$urlRouterProvider.otherwise("/brotherhood");
    }
]);