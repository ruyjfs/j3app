angular.module('admin').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('admin', {
                url: '/admin',
                templateUrl: 'module/admin/client/view/default.ng.html',
                controller: 'DefaultAdminCtrl'
            });

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


    //var nameModule = '';
    $rootScope.$on("$stateChangeStart",
        function (event, toState) {
            nameModule = toState.name.split('/')[0];
            $rootScope.nameModule = 'j3' + nameModule;
            setTheme(nameModule);
        }
    );
//console.log(nameModule);
//    $rootScope.nameModule = nameModule;
//    $rootScope.teste = 'HAHAHAA...';


}]);