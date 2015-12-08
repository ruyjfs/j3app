angular.module("scrum").run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireUser promise is rejected
        // and redirect the user back to the main page
        if (error === 'AUTH_REQUIRED') {
            $state.go('scrum');
        }
    });

    //console.log(error);
    console.log($rootScope.currentUser);
}]);

angular.module('scrum').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('scrum', {
                url: '/scrum',
                templateUrl: 'client/module/scrum/view/default.ng.html',
                controller: 'DefaultCtrl'
            })
            .state('scrum/project', {
                url: '/scrum/project',
                templateUrl: 'client/module/scrum/view/project.ng.html',
                controller: 'ProjectCtrl'
            })
            .state('scrum/team', {
                url: '/scrum/team',
                templateUrl: 'client/module/scrum/view/team.ng.html',
                controller: 'TeamCtrl'
            })
            .state('scrum/kanban', {
                url: '/scrum/kanban/:id',
                templateUrl: 'client/module/scrum/view/kanban.ng.html',
                controller: 'KanbanCtrl'
            });

        $urlRouterProvider.otherwise("/scrum");
    }
]);

///produtos/salvar     POST /produtos Product.save(product)
///produtos/getAll     GET  /produtos   return Product.find();