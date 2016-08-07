angular.module("scrum").run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireUser promise is rejected
        // and redirect the user back to the main page
        if (error === 'AUTH_REQUIRED') {
            //$state.go('scrum');
        }
    });

    //if (!Meteor.userId() && $state.current.url !== '/scrum') {
    //    $state.go('scrum');
    //}

}]);


angular.module('scrum').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){
        $locationProvider.html5Mode(true);

        var $header = 'module/scrum/client/view/header.ng.html';
        var $footer = 'module/scrum/client/view/footer.ng.html';

        $stateProvider
            .state('scrum', {
                url: '/scrum',
                resolve: {
                    paralax: function(){
                        setTimeout(function(){
                            $('.parallax').parallax();
                        }, 200);
                    }
                },
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "main": {
                        templateUrl: 'module/scrum/client/view/default.ng.html',
                        controller: 'DefaultCtrl',
                    },
                }
            })
            .state('scrum/product', {
                url: '/scrum/product',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "mainZoom": {
                        templateUrl: 'module/scrum/client/view/project.ng.html',
                    },
                    "main2": {
                        templateUrl: 'module/scrum/client/view/product-fab.ng.html',
                    },
                }
                //controller: 'ProjectCtrl'
            })
            .state('scrum/productkanban', {
                url: '/scrum/productkanban/:id/:sprintId',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "header2": {
                        templateUrl: 'module/scrum/client/view/product-toolbar.ng.html',
                    },
                    "mainZoom": {
                        templateUrl: 'module/scrum/client/view/kanban.ng.html',
                    },
                    "main2": {
                        templateUrl: 'module/scrum/client/view/product-fab-content.ng.html',
                    },
                }
            })
            .state('scrum/productkanbanprev', {
                url: '/scrum/productkanbanprev/:id/:sprintId',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "header2": {
                        templateUrl: 'module/scrum/client/view/product-toolbar.ng.html',
                    },
                    "mainFadeInLeftBig": {
                        templateUrl: 'module/scrum/client/view/kanban.ng.html',
                    },
                    "main2": {
                        templateUrl: 'module/scrum/client/view/product-fab-content.ng.html',
                    },
                }
            })
            .state('scrum/productkanbannext', {
                url: '/scrum/productkanbannext/:id/:sprintId',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "header2": {
                        templateUrl: 'module/scrum/client/view/product-toolbar.ng.html',
                    },
                    "mainFadeInRightBig": {
                        templateUrl: 'module/scrum/client/view/kanban.ng.html',
                    },
                    "main2": {
                        templateUrl: 'module/scrum/client/view/product-fab-content.ng.html',
                    },
                }
            })
            .state('scrum/kanban', {
                url: '/scrum/kanban/:id/:sprintId',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "header2": {
                        templateUrl: 'module/scrum/client/view/product-toolbar.ng.html',
                    },
                    "mainBounce": {
                        templateUrl: 'module/scrum/client/view/kanban.ng.html',
                    },
                    "main2": {
                        templateUrl: 'module/scrum/client/view/product-fab-content.ng.html',
                    },
                }
            })
            .state('scrum/team', {
                url: '/scrum/team',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "header2": {
                        templateUrl: 'module/scrum/client/view/product-toolbar.ng.html',
                    },
                    "mainBounce": {
                        templateUrl: 'module/scrum/client/view/team.ng.html',
                    },
                }
                //controller: 'TeamCtrl'
            })
            .state('scrum/content', {
                url: '/scrum/content/:id/:sprintId',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "mainBounce": {
                        templateUrl: 'module/scrum/client/view/project-content.ng.html',
                    },
                }
            })
            .state('scrum/sprint', {
                url: '/scrum/sprint/:id/:sprintId',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "header2": {
                        templateUrl: 'module/scrum/client/view/product-toolbar.ng.html',
                    },
                    "mainBounce": {
                        templateUrl: 'module/scrum/client/view/sprint.ng.html',
                    },
                    "main2": {
                        templateUrl: 'module/scrum/client/view/product-fab-content.ng.html',
                    },
                }
            })
            .state('scrum/trash', {
                url: '/scrum/trash/:id/:sprintId',
                views: {
                    "header2": {
                        templateUrl: 'module/scrum/client/view/product-toolbar.ng.html',
                    },
                    "mainBounce": {
                        templateUrl: 'module/scrum/client/view/trash.ng.html',
                    },
                    "main2": {
                        templateUrl: 'module/scrum/client/view/product-fab-content.ng.html',
                    },
                }
            })
            .state('scrum/status', {
                url: '/scrum/status/:id/:sprintId',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "header2": {
                        templateUrl: 'module/scrum/client/view/product-toolbar.ng.html',
                    },
                    "mainBounce": {
                        templateUrl: 'module/scrum/client/view/status.ng.html',
                    },
                    "main2": {
                        templateUrl: 'module/scrum/client/view/product-fab-content.ng.html',
                    },
                }
            })
            .state('scrum/story', {
                url: '/scrum/story/:id/:sprintId',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "header2": {
                        templateUrl: 'module/scrum/client/view/product-toolbar.ng.html',
                    },
                    "mainBounce": {
                        templateUrl: 'module/scrum/client/view/story.ng.html',
                    },
                    "main2": {
                        templateUrl: 'module/scrum/client/view/product-fab-content.ng.html',
                    },
                }
            })
            .state('scrum/product-team', {
                url: '/scrum/product-team/:id/:sprintId',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "header2": {
                        templateUrl: 'module/scrum/client/view/product-toolbar.ng.html',
                    },
                    "mainBounce": {
                        templateUrl: 'module/scrum/client/view/project-team.ng.html',
                    },
                    "main2": {
                        templateUrl: 'module/scrum/client/view/product-fab-content.ng.html',
                    },
                }
            })
            .state('scrum/planning-poker', {
                url: '/scrum/planning-poker/:id/:sprintId',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "header2": {
                        templateUrl: 'module/scrum/client/view/product-toolbar.ng.html',
                    },
                    "mainBounce": {
                        templateUrl: 'module/scrum/client/view/planning-poker.ng.html',
                    },
                    "main2": {
                        templateUrl: 'module/scrum/client/view/product-fab-content.ng.html',
                    },
                }
            })
            .state('scrum/backlog', {
                url: '/scrum/backlog/:id/:sprintId',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "header2": {
                        templateUrl: 'module/scrum/client/view/product-toolbar.ng.html',
                    },
                    "mainBounce": {
                        templateUrl: 'module/scrum/client/view/backlog.ng.html',
                    },
                    "main2": {
                        templateUrl: 'module/scrum/client/view/product-fab-content.ng.html',
                    },
                }
            })
            .state('scrum/burndown', {
                url: '/scrum/burndown/:id/:sprintId',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "header2": {
                        templateUrl: 'module/scrum/client/view/product-toolbar.ng.html',
                    },
                    "mainBounce": {
                        templateUrl: 'module/scrum/client/view/burndown.ng.html',
                    },
                    "main2": {
                        templateUrl: 'module/scrum/client/view/product-fab-content.ng.html',
                    },
                }
            });
        var strDomain = window.location.hostname;
        switch (strDomain) {
            case  'j3scrum.com'
            || 'j3game.com'
            || 'j3tec.com'
            || 'j3drive.com'
            :
                strModule = strDomain.replace('.com', '');
                break;
            default:
                strModule = 'brotherhood';
                break;
        }
        if (Meteor.userId()) {
            $urlRouterProvider.otherwise( '/' + strModule + "/product");
        } else {
            console.log(strModule);
            $urlRouterProvider.otherwise('/' + strModule);
        }
    }
]);

///produtos/salvar     POST /produtos Product.save(product)
///produtos/getAll     GET  /produtos   return Product.find();