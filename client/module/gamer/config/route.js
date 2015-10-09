//angular.module("gamer").run(['$rootScope', '$state', function($rootScope, $state) {
//    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
//        // We can catch the error thrown when the $requireUser promise is rejected
//        // and redirect the user back to the main page
//        if (error === 'AUTH_REQUIRED') {
//            $state.go('user');
//        }
//    });
//}]);
////
//angular.module('gamer').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
//    function($urlRouterProvider, $stateProvider, $locationProvider){
//        $locationProvider.html5Mode(true);
//
//        $stateProvider
//            .state('gamer', {
//                url: '/gamer',
//                templateUrl: 'client/module/user/view/default.ng.html',
//                controller: 'DefaultCtrl'
//            });
//
//        //$urlRouterProvider.otherwise("/gamer");
//    }
//]);