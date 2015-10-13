angular.module('admin').controller('ToolbarCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$location', '$meteor', '$rootScope',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $location, $meteor, $rootScope) {

        $scope.toggleMenu = buildToggler('menu');
        $scope.toggleContactList = buildToggler('contact-list');

        $scope.title = 'Brotherhood';
        $scope.redirect = function(route){
            arrTitle = route.split('/');
            $scope.title = arrTitle[1];
            $mdSidenav('menu').close();
            $location.path(route);
        }

        $scope.close = function(){
            $mdSidenav('chat').close()
                .then(function(){
                    $scope.messages = [];
                    console.info('ENTROU MANO')
                });
            $mdSidenav('contact-list').toggle();
        }

        $scope.toggleChat = function(friendId){
            $mdSidenav('contact-list').close();
            $scope.friendId = friendId;
            $scope.currentUser.userId = $rootScope.currentUser._id;

            $meteor.subscribe('messages');
            $scope.messages = $meteor.collection( function() {
                return Messages.find(
                    {
                        $or: [
                            {
                                'userId' : $rootScope.currentUser._id,
                                'friendId' : friendId
                            }
                            ,
                            {
                                'userId' : friendId,
                                'friendId' : $rootScope.currentUser._id
                            }
                        ]
                    }
                );
            });

            $mdSidenav('chat').toggle();
            //$scope.messages = $meteor.collection(Messages).subscribe('messages', friendId);
        };

        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildToggler(navID) {
            var debounceFn = $mdUtil.debounce(function () {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                        //$scope.messages = [];
                        //console.info('ENTROU MANO')
                    });
            }, 200);
            return debounceFn;
        }
    }
]);