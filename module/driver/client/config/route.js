//angular.module("driver").run(['$rootScope', '$state', function($rootScope, $state) {
//    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
//        // We can catch the error thrown when the $requireUser promise is rejected
//        // and redirect the user back to the main page
//        if (error === 'AUTH_REQUIRED') {
//            $state.go('user');
//        }
//    });
//}]);

angular.module('driver').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){
        $locationProvider.html5Mode(true);

        var $header = 'module/driver/client/view/header.ng.html';
        var $footer = 'module/driver/client/view/footer.ng.html';

        $stateProvider
            .state('driver', {
                url: '/driver',
                views: {
                    "header": {
                        templateUrl: $header,
                    },
                    "main": {
                        templateUrl: 'module/driver/client/view/default.ng.html',
                        controller: 'DefaultCtrl'
                    },
                    "footer": {
                        templateUrl: $footer,
                    }
                }
            });

        //$urlRouterProvider.otherwise("/driver");
    }
]);