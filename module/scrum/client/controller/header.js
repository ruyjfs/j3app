//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('HeaderCtrl', ['$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$location', '$reactive', '$mdDialog', '$mdBottomSheet', '$rootScope', '$mdToast',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $location, $reactive, $mdDialog, $mdBottomSheet, $rootScope, $mdToast) {
        $reactive(this).attach($scope);

        //this.toggleMenu = buildToggler('menu');
        //this.toggleContactList = buildToggler('contact-list');

        // Submetendo o formulario com enter.
        //$('body').on('keypress', 'input',function(keyEvent, element){
        //    if (keyEvent.keyCode === 13) {
        //        console.log($(keyEvent.target).closest('form').submit());
        //        console.log(keyEvent);
        //        console.log('aeeeeee');
        //        //cordova.plugins.Keyboard.close();
        //    }
        //})

        Meteor.subscribe('users');
        Meteor.subscribe('message');
        Meteor.users.find({"status.online": true}).observe({
            added: function (user) {
                if (Meteor.userId() && Meteor.userId() !== user._id){
                    //Materialize.toast(user.name + ' ' + user.lastName + ' is online;', 4000);

                    Meteor.subscribe('users');
                    var user = Meteor.users.findOne(user._id);
                    if (user) {
                        if (user.status) {
                            if (user.status.idle == true) {
                                user.statusColor = ' #FFC107';
                                user.statusName = ' Away';
                            } else if (user.status.online == true) {
                                user.statusColor = ' #9ACD32';
                                user.statusName = ' online';
                            } else {
                                user.statusColor = ' rgba(224, 224, 224, 0.77)';
                                user.statusName = ' offline';
                            }
                        } else {
                            user.statusColor = ' rgba(224, 224, 224, 0.77)';
                            user.statusName = ' offline';
                        }

                        // Imagem do gravatar.
                        if (user.emails && user.emails[0].address) {
                            user.img = 'http://www.gravatar.com/avatar/'+CryptoJS.MD5(user.emails[0].address).toString()+'?s=40&d=mm';
                        } else {
                            user.img = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?s=40&d=mm&f=y';
                        }

                        user.nameTreated = user.name + ' ' + user.lastName;
                        if (user.nameTreated.length > 14) {
                            user.nameTreated = user.nameTreated.substr(0,13) + '...';
                        }
                    }
                    setTimeout(function(){
                        $mdToast.show({
                            hideDelay   : 4000,
                            //position    : 'right',
                            module: 'user',
                            controller  : 'ToastUserCtrl',
                            templateUrl: 'module/user/client/views/toast-user.ng.html',
                            locals: {
                                user: user
                            },
                        });
                    }, 300);
                }
                //$mdToast.show(
                //    $mdToast.simple()
                //        .textContent('Simple Toast!')
                //        .position({bottom:true})
                //        .hideDelay(3000)
                //);

                // id just came online
            },
            removed: function (user) {
                //console.log('offline');

                if (Meteor.userId() && Meteor.userId() !== user._id){
                    //Materialize.toast(user.name + ' ' + user.lastName + ' is offline;', 4000);
                    Meteor.subscribe('users');
                    var user = Meteor.users.findOne(user._id);
                    if (user) {
                        if (user.status) {
                            if (user.status.idle == true) {
                                user.statusColor = ' #FFC107';
                                user.statusName = ' Away';
                            } else if (user.status.online == true) {
                                user.statusColor = ' #9ACD32';
                                user.statusName = ' online';
                            } else {
                                user.statusColor = ' rgba(224, 224, 224, 0.77)';
                                user.statusName = ' offline';
                            }
                        } else {
                            user.statusColor = ' rgba(224, 224, 224, 0.77)';
                            user.statusName = ' offline';
                        }

                        // Imagem do gravatar.
                        if (user.emails && user.emails[0].address) {
                            user.img = 'http://www.gravatar.com/avatar/'+CryptoJS.MD5(user.emails[0].address).toString()+'?s=40&d=mm';
                        } else {
                            user.img = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?s=40&d=mm&f=y';
                        }

                        user.nameTreated = user.name + ' ' + user.lastName;
                        if (user.nameTreated.length > 14) {
                            user.nameTreated = user.nameTreated.substr(0,13) + '...';
                        }
                    }
                    setTimeout(function(){
                        $mdToast.show({
                            hideDelay   : 4000,
                            //position    : 'right',
                            module: 'user',
                            controller  : 'ToastUserCtrl',
                            templateUrl: 'module/user/client/views/toast-user.ng.html',
                            locals: {
                                user: user
                            },
                        });
                    }, 300);
                }
                // id just went offline
            }
        });

        this.helpers(
            {
                totalMessagesNotVisualized: function () {
                    user = Meteor.users.find().map(function (user) {
                        user.messagesNotVisualized = Message.find(
                            {
                                $and: [
                                    {
                                        'userId': user._id,
                                        'contactId': Meteor.userId(),
                                        $or: [
                                            {visualized: ''},
                                            {visualized: null}
                                        ]
                                    },
                                ]
                            }
                        ).fetch().length;
                        return user;
                    }).filter(function (user) {
                        return (user.messagesNotVisualized > 0);
                    });

                    if (user.length > 99) {
                        return '99+'
                    } else if (user.length > 0) {
                        return user.length;
                    } else {
                        return '';
                    }
                },
                isGuest: function () {
                    if (Meteor.userId()) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        );

        this.title = 'Brotherhood';
        this.redirect = function (route) {
            arrTitle = route.split('/');
            $scope.title = arrTitle[1];
            $mdSidenav('menu').close();
            $location.path(route);
        };

        this.showModulesGrid = function ($event) {
            //console.log($mdBottomSheet);
            $scope.alert = '';
            $mdBottomSheet.show({
                module: 'user',
                controller: 'ModulesGridCtrl',
                templateUrl: 'module/user/client/views/modules-grid.ng.html',
                clickOutsideToClose: true,
                targetEvent: $event
            }).then(function (clickedItem) {
                //$mdToast.show(
                //    $mdToast.simple()
                //        .textContent(clickedItem['name'] + ' clicked!')
                //        .position('top right')
                //        .hideDelay(1500)
                //);
            });
        };

        $scope.modalSprintChange = function (ev) {
            $mdDialog.show({
                controller: 'SprintChangeCtrl',
                templateUrl: 'module/scrum/client/view/sprint-change.ng.html',
                clickOutsideToClose: true,
                targetEvent: ev
            }).then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
        };

        this.modalLogin = function (ev, id) {
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
                clickOutsideToClose: true,
                locals: {
                    id: id
                },
                targetEvent: ev
            }).then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
        };

        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        //function buildToggler(navID) {
        //    var debounceFn = $mdUtil.debounce(function () {
        //        $mdSidenav(navID)
        //            .toggle()
        //            .then(function () {
        //                $log.debug("toggle " + navID + " is done");
        //                //$scope.messages = [];
        //                //console.info('ENTROU MANO')
        //            });
        //    }, 200);
        //    return debounceFn;
        //}
    }
]);