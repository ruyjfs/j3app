angular.module('admin').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('admin', {
                url: '/admin',
                templateUrl: 'client/module/admin/view/default.ng.html',
                controller: 'DefaultCtrl'
            });

        //console.log($stateProvider);

        $urlRouterProvider.otherwise("/admin");
        //console.log($stateProvider.pushState());
    }
]);

//angular.module("admin").run(['$rootScope', '$state', function($rootScope, $state) {
//    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
//        // We can catch the error thrown when the $requireUser promise is rejected
//        // and redirect the user back to the main page
//        if (error === 'AUTH_REQUIRED') {
//            $state.go('admin');
//        }
//    });
//
//    $rootScope.$on("$stateChangeStart",
//        function (event, toState) {
//            nameModule = toState.name.split('/')[0];
//            //setTheme(nameModule);
//        }
//    );
//}]);