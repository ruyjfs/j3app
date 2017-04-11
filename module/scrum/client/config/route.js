angular.module("scrum").run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireUser promise is rejected
        // and redirect the user back to the main page
        if (error === 'AUTH_REQUIRED') {
            //$state.go('scrum');
        }
    });

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        if (toState.name == 'state.with.resolve') {
            $scope.showSpinner();  //this is a function you created to show the loading animation
            console.log('aquui');
        }
    })

    //if (!Meteor.userId() && $state.current.url !== '/scrum') {
    //    $state.go('scrum');
    //}
}]);

/**
 * @todo melhorar depois a rota default pra quem estiver logado.
 */
angular.module('scrum').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){
        $locationProvider.html5Mode(true);

        var $header = 'module/scrum/client/view/header.ng.html';
        var $footer = 'module/scrum/client/view/footer.ng.html';

        $stateProvider
            .state('scrum/', {
                url: '/scrum/',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "menuLeft": {
                        templateUrl: 'module/scrum/client/view/header-toolbar-organization.ng.html',
                    },
                    "mainZoom": {
                        templateUrl: 'module/scrum/client/view/organization.ng.html',
                    },
                    "main2": {
                        templateUrl: 'module/scrum/client/view/organization-fab.ng.html',
                    },
                }
            })
            .state('scrum/organization/all', {
                url: '/scrum/organization',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "menuLeft": {
                        templateUrl: 'module/scrum/client/view/header-toolbar-organization.ng.html',
                    },
                    "mainZoom": {
                        templateUrl: 'module/scrum/client/view/organization.ng.html',
                    },
                    "main2": {
                        templateUrl: 'module/scrum/client/view/organization-fab.ng.html',
                    },
                }
                //controller: 'ProductCtrl'
            })
            .state('scrum/home', {
                url: '/scrum/home',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "menuLeft": {
                        templateUrl: 'module/scrum/client/view/header-toolbar-organization.ng.html',
                    },
                    "mainZoom": {
                        templateUrl: 'module/scrum/client/view/organization.ng.html',
                    },
                    "main2": {
                        templateUrl: 'module/scrum/client/view/organization-fab.ng.html',
                    },
                }
                //controller: 'ProductCtrl'
            })
            .state('scrum/organization/team', {
                url: '/scrum/:organization/team',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "menuLeft": {
                        templateUrl: 'module/scrum/client/view/header-toolbar.ng.html',
                    },
                    "mainZoom": {
                        templateUrl: 'module/scrum/client/view/team.ng.html',
                    },
                    "main2": {
                        templateUrl: 'module/scrum/client/view/team-fab.ng.html',
                    },
                }
                //controller: 'TeamCtrl'
            })
            .state('scrum/organization', {
                url: '/scrum/:organization',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "menuLeft": {
                        templateUrl: 'module/scrum/client/view/header-toolbar.ng.html',
                    },
                    "mainZoom": {
                        templateUrl: 'module/scrum/client/view/product.ng.html',
                    },
                    "main2": {
                        templateUrl: 'module/scrum/client/view/product-fab.ng.html',
                    },
                }
            })
            .state('scrum/organization/product', {
                url: '/scrum/:organization/:product',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "menuLeft": {
                        templateUrl: 'module/scrum/client/view/header-toolbar.ng.html',
                    },
                    "mainZoom": {
                        templateUrl: 'module/scrum/client/view/product.ng.html',
                    },
                    "main2": {
                        templateUrl: 'module/scrum/client/view/product-fab.ng.html',
                    },
                }
                //controller: 'ProductCtrl'
            })
            .state('scrum/organization/product/all', {
                url: '/scrum/organization/product',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "menuLeft": {
                        templateUrl: 'module/scrum/client/view/header-toolbar.ng.html',
                    },
                    "mainZoom": {
                        templateUrl: 'module/scrum/client/view/product.ng.html',
                    },
                    "main2": {
                        templateUrl: 'module/scrum/client/view/product-fab.ng.html',
                    },
                }
                //controller: 'ProductCtrl'
            })
            .state('scrum', {
                url: '/scrum',
                resolve: {
                    paralax: function(){
                        setTimeout(function(){
                            $('.parallax').parallax();
                        }, 200);
                        console.log('aaaa');
                    }
                },
                waitOn: function(){
                    // waitOn makes sure that this publication is ready before rendering your template
                    //return Meteor.subscribe("publication");
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
                    "menuLeft": {
                        templateUrl: 'module/scrum/client/view/header-toolbar.ng.html',
                    },
                    "mainZoom": {
                        templateUrl: 'module/scrum/client/view/product.ng.html',
                    },
                    "main2": {
                        templateUrl: 'module/scrum/client/view/product-fab.ng.html',
                    },
                }
                //controller: 'ProductCtrl'
            })
            .state('scrum/organization/product/kanban', {
                url: '/scrum/:organization/:product/kanban/:sprint',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "menuLeft": {
                        templateUrl: 'module/scrum/client/view/product-toolbar.ng.html',
                    },
                    "mainZoom": {
                        templateUrl: 'module/scrum/client/view/kanban.ng.html',
                    },
                    "main2": {
                        templateUrl: 'module/scrum/client/view/kanban-fab.ng.html',
                    },
                }
            })
            .state('scrum/productkanbanprev', {
                url: '/scrum/productkanbanprev/:id/:sprintId',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "menuLeft": {
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
                    "menuLeft": {
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
            //.state('scrum/organization/product/kanban', {
            //    url: '/scrum/kanban/:id/:sprintId',
            //    views: {
            //        //"header": {
            //        //    templateUrl: $header,
            //        //},
            //        "menuLeft": {
            //            templateUrl: 'module/scrum/client/view/product-toolbar.ng.html',
            //        },
            //        "mainBounce": {
            //            templateUrl: 'module/scrum/client/view/kanban.ng.html',
            //        },
            //        "main2": {
            //            templateUrl: 'module/scrum/client/view/product-fab-content.ng.html',
            //        },
            //    }
            //})
            //.state('scrum/content', {
            //    url: '/scrum/content/:id/:sprintId',
            //    views: {
            //        //"header": {
            //        //    templateUrl: $header,
            //        //},
            //        "mainBounce": {
            //            templateUrl: 'module/scrum/client/view/project-content.ng.html',
            //        },
            //    }
            //})
            .state('scrum/organization/product/sprint', {
                url: '/scrum/:organization/:product/sprint/:sprint',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "menuLeft": {
                        templateUrl: 'module/scrum/client/view/product-toolbar.ng.html',
                    },
                    "mainBounce": {
                        templateUrl: 'module/scrum/client/view/sprint.ng.html',
                    },
                    //"main2": {
                    //    templateUrl: 'module/scrum/client/view/product-fab-content.ng.html',
                    //},
                }
            })
            .state('scrum/organization/product/trash', {
                url: '/scrum/:organization/:product/trash/:sprint',
                views: {
                    "menuLeft": {
                        templateUrl: 'module/scrum/client/view/product-toolbar.ng.html',
                    },
                    "mainBounce": {
                        templateUrl: 'module/scrum/client/view/trash.ng.html',
                    },
                    //"main2": {
                    //    templateUrl: 'module/scrum/client/view/product-fab-content.ng.html',
                    //},
                }
            })
            .state('scrum/organization/product/status', {
                url: '/scrum/:organization/:product/status/:sprint',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "menuLeft": {
                        templateUrl: 'module/scrum/client/view/product-toolbar.ng.html',
                    },
                    "mainBounce": {
                        templateUrl: 'module/scrum/client/view/status.ng.html',
                    },
                    "main2": {
                        templateUrl: 'module/scrum/client/view/status-fab.ng.html',
                    },
                }
            })
            .state('scrum/organization/product/story', {
                url: '/scrum/:organization/:product/story/:sprint',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "menuLeft": {
                        templateUrl: 'module/scrum/client/view/product-toolbar.ng.html',
                    },
                    "mainBounce": {
                        templateUrl: 'module/scrum/client/view/story.ng.html',
                    },
                    "main2": {
                        templateUrl: 'module/scrum/client/view/story-fab.ng.html',
                    },
                }
            })
            .state('scrum/organization/product/product-team', {
                url: '/scrum/:organization/:product/product-team/:sprint',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "menuLeft": {
                        templateUrl: 'module/scrum/client/view/product-toolbar.ng.html',
                    },
                    "mainBounce": {
                        templateUrl: 'module/scrum/client/view/project-team.ng.html',
                    },
                    //"main2": {
                    //    templateUrl: 'module/scrum/client/view/product-fab-content.ng.html',
                    //},
                }
            })
            .state('scrum/organization/product/planning-poker', {
                url: '/scrum/:organization/:product/planning-poker/:sprint',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "menuLeft": {
                        templateUrl: 'module/scrum/client/view/product-toolbar.ng.html',
                    },
                    "mainBounce": {
                        templateUrl: 'module/scrum/client/view/planning-poker.ng.html',
                    },
                    //"main2": {
                    //    templateUrl: 'module/scrum/client/view/product-fab-content.ng.html',
                    //},
                }
            })
            .state('scrum/organization/product/backlog', {
                url: '/scrum/:organization/:product/backlog/:sprint',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "menuLeft": {
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
            .state('scrum/organization/product/burndown', {
                url: '/scrum/:organization/:product/burndown/:sprint',
                views: {
                    //"header": {
                    //    templateUrl: $header,
                    //},
                    "menuLeft": {
                        templateUrl: 'module/scrum/client/view/product-toolbar.ng.html',
                    },
                    "mainBounce": {
                        templateUrl: 'module/scrum/client/view/burndown.ng.html',
                    },
                    //"main2": {
                    //    templateUrl: 'module/scrum/client/view/product-fab-content.ng.html',
                    //},
                }
            });

        var strDomain = window.location.hostname;
        switch (strDomain) {
            case 'j3scrum.com':
            case '172.17.0.1':
                strModule = 'scrum';
                break;
            case 'j3game.com':
                strModule = 'game';
                break;
            case 'j3tec.com':
                strModule = 'tec';
                break;
            case 'j3drive.com':
                strModule = 'drive';
                break;
            default:
                strModule = 'brotherhood';
                break;
        }

        if (Meteor.userId()) {
            //$urlRouterProvider.otherwise( '/' + strModule + "/product");
            $urlRouterProvider.otherwise('/scrum/organization');
            //$urlRouterProvider.otherwise('/' + strModule + '/home');
        } else {
            $urlRouterProvider.otherwise('/' + strModule);
        }
    }
]);

///produtos/salvar     POST /produtos Product.save(product)
///produtos/getAll     GET  /produtos   return Product.find();