//angular.module("game").run(['$rootScope', '$state', function($rootScope, $state) {
//    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
//        // We can catch the error thrown when the $requireUser promise is rejected
//        // and redirect the user back to the main page
//        if (error === 'AUTH_REQUIRED') {
//            $state.go('user');
//        }
//    });
//}]);

angular.module('game').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){
        $locationProvider.html5Mode(true);

        var $header = 'module/game/client/view/header.ng.html';
        var $footer = 'module/game/client/view/footer.ng.html';

        $stateProvider
            .state('game', {
                url: '/game',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "main": {
                        templateUrl: 'module/game/client/view/default.ng.html',
                        controller: 'DefaultCtrl'
                    },
                    //"footer": {
                    //    templateUrl: $footer,
                    //}
                }
            });

        //$urlRouterProvider.otherwise("/game");
    }
]);