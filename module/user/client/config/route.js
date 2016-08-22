angular.module('user').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){
        $locationProvider.html5Mode(true);

        //$urlRouterProvider.otherwise("/user");
        strDomain = window.location.hostname;

        //var $header = 'module/admin/client/view/toolbar.ng.html';
        var $header = 'module/user/client/views/header.ng.html';
        var $footer = 'module/user/client/views/footer.ng.html';

        $stateProvider
            .state('user', {
                url: '/user',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "main": {
                        templateUrl: 'module/user/client/views/default.ng.html',
                        controller: 'DefaultCtrl',
                    },
                    //"footer": {
                    //    templateUrl: $footer,
                    //}
                }
            })
            .state('user/login', {
                url: '/user/login',
                templateUrl: 'module/user/client/views/login.ng.html',
                controller: 'LoginCtrl',
                controllerAs: 'lc'
            })
            .state('user/register',{
                url: '/user/register',
                templateUrl: 'module/user/client/views/register.ng.html',
                controller: 'RegisterCtrl',
                controllerAs: 'rc'
            })
            .state('user/friend',{
                url: '/user/friend',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "main": {
                        templateUrl: 'module/user/client/views/friend2.ng.html',
                        controller: 'Friend2Ctrl'
                    },
                    //"footer": {
                    //    templateUrl: $footer,
                    //}
                }
            })
            .state('user/resetpw', {
                url: '/user/resetpw',
                templateUrl: 'module/user/views/client/reset-password.ng.html',
                controller: 'ResetCtrl',
                controllerAs: 'rpc'
            })

            /**
             * @todo Redirecionar conforme o modulo, por exemplo se a pessoa deslogou no modulo scrum, redirecionar para a tela principal do scrum se for outro modulo redirecionar para a tela principal do outro modulo.
             **/
            .state('user/logout', {
                url: '/user/logout',
                resolve: {
                    "logout": ['$meteor', '$state', function($meteor, $state) {
                        return $meteor.logout().then(function(){

                            switch (strDomain) {
                                case 'j3scrum.com' :
                                    strModule = 'j3scrum.com';
                                    break;
                                case  'j3game.com':
                                    strModule = 'game';
                                    break;
                                case  'j3tec.com':
                                    strModule = 'tec';
                                    break;
                                case  'j3drive.com':
                                    strModule = 'drive';
                                    break;
                                default:
                                    strModule = 'brotherhood';
                                    break;
                            }

                            //$state.go('parties');
                            $state.go(strModule).then(function() {
                                // Get in a spaceship and fly to Jupiter, or whatever your callback does.
                                $('.parallax').parallax();
                            });
                        }, function(err){
                            console.log('logout error - ', err);
                        });
                    }]
                }
            });

        //if (Meteor.userId()) {
        //    $urlRouterProvider.otherwise("/user");
        //} else {
        //    $urlRouterProvider.otherwise("/user");
        //}
    }
]);

angular.module("user").run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireUser promise is rejected
        // and redirect the user back to the main page
        if (error === 'AUTH_REQUIRED') {
            $state.go('user');
        }
        $('.parallax').parallax();
    });
}]);