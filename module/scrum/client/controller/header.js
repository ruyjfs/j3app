//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('HeaderCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$location', '$meteor', '$rootScope', '$mdDialog', '$mdBottomSheet', '$mdToast',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $location, $meteor, $rootScope, $mdDialog, $mdBottomSheet, $mdToast) {

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

        $scope.showModulesGrid = function($event) {
            console.log($mdBottomSheet);
            $scope.alert = '';
            $mdBottomSheet.show({
                module: 'user',
                controller: 'ModulesGridCtrl',
                templateUrl: 'module/user/client/views/modules-grid.ng.html',
                clickOutsideToClose: true,
                targetEvent: $event
            }).then(function(clickedItem) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(clickedItem['name'] + ' clicked!')
                        .position('top right')
                        .hideDelay(1500)
                );
            });
        };

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

        $scope.modalLogin = function(ev, id){
            //$mdDialog.alert()
            //    .parent(angular.element(document.querySelector('#popupContainer')))
            //    .clickOutsideToClose(true)
            //    .title('This is an alert title')
            //    .content('You can specify some description text in here.')
            //    .ariaLabel('Alert Dialog Demo')
            //    .ok('Got it!')
            //    .targetEvent(ev)

            $mdDialog.show({
                module: 'user',
                controller: 'LoginModalCtrl',
                templateUrl: 'module/user/client/views/login-modal.ng.html',
                clickOutsideToClose:true,
                locals : {
                    id: id
                },
                targetEvent: ev
            }).then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
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