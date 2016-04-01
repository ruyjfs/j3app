angular.module("scrum").run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireUser promise is rejected
        // and redirect the user back to the main page
        if (error === 'AUTH_REQUIRED') {

            $state.go('scrum');
            console.log(toState);
        }
    });

    if (!Meteor.userId() && $state.current.url !== '/scrum') {
        $state.go('scrum');
    }

}]);


angular.module('scrum').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('scrum', {
                url: '/scrum',
                templateUrl: 'module/scrum/client/view/default.ng.html',
                controller: 'DefaultCtrl',
                resolve: {
                    paralax: function(){
                        setTimeout(function(){
                            $('.parallax').parallax();
                        }, 200);
                    }
                }
            })
            .state('scrum/project', {
                url: '/scrum/project',
                templateUrl: 'module/scrum/client/view/project.ng.html',
                //controller: 'ProjectCtrl'
            })
            .state('scrum/team', {
                url: '/scrum/team',
                templateUrl: 'module/scrum/client/view/team.ng.html',
                //controller: 'TeamCtrl'
            })
            .state('scrum/kanban', {
                url: '/scrum/kanban/:id',
                templateUrl: 'module/scrum/client/view/kanban.ng.html',
                //controller: 'KanbanCtrl'
            })
            .state('scrum/content', {
                url: '/scrum/content/:id/:sprintId',
                templateUrl: 'module/scrum/client/view/project-content.ng.html',
                //controller: 'ProjectContentCtrl'
            });

        if (Meteor.userId()) {
            $urlRouterProvider.otherwise("/scrum/project");
        } else {
            $urlRouterProvider.otherwise("/scrum");
        }
    }
]);

///produtos/salvar     POST /produtos Product.save(product)
///produtos/getAll     GET  /produtos   return Product.find();