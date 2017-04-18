angular.module('admin').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){
        $locationProvider.html5Mode(true);

        var $header = 'module/admin/client/view/header.ng.html';
        var $footer = 'module/admin/client/view/footer.ng.html';

        $stateProvider
            .state('admin', {
                url: '/admin',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "menuLeft": {
                        templateUrl: 'module/admin/client/view/toolbar.ng.html',
                        controller: 'UserToolbarCtrl as ctrl'
                    },
                    "mainZoom": {
                        templateUrl: 'module/admin/client/view/default.ng.html',
                        controller: 'DefaultAdminCtrl'
                    },
                    //"footer": {
                    //    templateUrl: $footer,
                    //}
                }
            })
            .state('admin/users', {
                url: '/admin/users',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "menuLeft": {
                        templateUrl: 'module/admin/client/view/toolbar.ng.html',
                        controller: 'UserToolbarCtrl as ctrl'
                    },
                    "mainZoom": {
                        templateUrl: 'module/admin/client/view/default.ng.html',
                        controller: 'DefaultAdminCtrl'
                    },
                    // "main2": {
                    //     templateUrl: 'module/scrum/client/view/organization-fab.ng.html'
                    // }
                }
                //controller: 'ProductCtrl'
            })
        ;

        $urlRouterProvider.otherwise("/admin");
    }
]);


//angular.module('admin').run(['$state',
//    function ($state) {
//        console.log($state.$current);
//        //$rootScope.$state = $state;
//    }
//]);

angular.module("admin").run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireUser promise is rejected
        // and redirect the user back to the main page
        if (error === 'AUTH_REQUIRED') {
            $state.go('/');
        }
    });

    $rootScope.$on("$stateChangeStart",
        function (event, toState) {
            nameModule = toState.name.split('/')[0];
            switch (nameModule){
                case 'user' :
                    $rootScope.themeMaterialize = 'orange darken-3';
                    break;
                case 'admin' :
                    $rootScope.themeMaterialize = 'grey darken-4';
                    break;
                case 'brotherhood' :
                    $rootScope.themeMaterialize = 'grey darken-4';
                    break;
                case 'scrum' :
                    $rootScope.themeMaterialize = 'brown darken-3';
                    break;
                case 'game' :
                    $rootScope.themeMaterialize = 'red darken-3';
                    break;
                case 'drive' :
                    $rootScope.themeMaterialize = 'grey';
                    break;
                case 'tec' :
                    $rootScope.themeMaterialize = 'blue';
                    break;
                default:
                    $rootScope.themeMaterialize = 'orange darken-3';
                    break;
            }
            setTheme(nameModule);
            $rootScope.nameModule = 'j3' + nameModule;

            if ($rootScope.nameModule === 'j3brotherhood') {
                $rootScope.nameModule = 'j3rotherhood';
            }
        }
    );
//console.log(nameModule);
//    $rootScope.nameModule = nameModule;
//    $rootScope.teste = 'HAHAHAA...';


}]);