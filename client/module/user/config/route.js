angular.module('user').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('user', {
                url: '/user',
                templateUrl: 'client/module/user/views/default.ng.html',
                controller: 'DefaultCtrl'
            })
            .state('user/login', {
                url: '/user/login',
                templateUrl: 'client/module/user/views/login.ng.html',
                controller: 'LoginCtrl',
                controllerAs: 'lc'
            })
            .state('user/register',{
                url: '/user/register',
                templateUrl: 'client/module/user/views/register.ng.html',
                controller: 'RegisterCtrl',
                controllerAs: 'rc'
            })
            .state('user/resetpw', {
                url: '/user/resetpw',
                templateUrl: 'client/module/user/views/reset-password.ng.html',
                controller: 'ResetCtrl',
                controllerAs: 'rpc'
            })
            .state('user/logout', {
                url: '/user/logout',
                resolve: {
                    "logout": ['$meteor', '$state', function($meteor, $state) {
                        return $meteor.logout().then(function(){
                            //$state.go('parties');
                            $state.go('scrum').then(function() {
                                // Get in a spaceship and fly to Jupiter, or whatever your callback does.
                                $('.parallax').parallax();
                            });
                        }, function(err){
                            console.log('logout error - ', err);
                        });
                    }]
                }
            });

        $urlRouterProvider.otherwise("/user");
    }
]);

angular.module("user").run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireUser promise is rejected
        // and redirect the user back to the main page
        if (error === 'AUTH_REQUIRED') {
            $state.go('user');
        }
    });
}]);