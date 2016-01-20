//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('user').controller('LoginModalCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$mdDialog', '$state', '$reactive',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $mdDialog, $state, $reactive) {
        $reactive(this).attach($scope);

        $scope.dataForm = {
            name: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        $scope.error = '';

        $scope.login = function () {
            Meteor.loginWithPassword(this.dataForm.email, this.dataForm.password, function(err) {
                if (err) {
                    //console.log(err);
                    $scope.error = 'User not found';
                } else {
                    $mdDialog.hide();
                    $state.go('scrum/project');
                }
            });
        };

        $scope.reset = function () {
            Accounts.forgotPassword($scope.dataForm.email, function(err) {
                    if (err) {
                        $scope.error = 'Error sending forgot password email - ' + err;
                    } else {
                        $mdDialog.hide();
                        $state.go('scrum/project');

                    }
                }
            );
        };

        $scope.register = function () {

            if (!$scope.dataForm.name || !$scope.dataForm.lastName) {
                $scope.error = 'Registration error - Inform you name';
            } else if ($scope.dataForm.password == $scope.dataForm.confirmPassword) {
                Accounts.createUser($scope.dataForm, function (err) {
                        if (err) {
                            $scope.error = 'Registration error - ' + err;
                        } else {
                            var form = Meteor.users.findOne(Meteor.user()._id);
                            form.name = $scope.dataForm.lastName;
                            form.lastName = $scope.dataForm.lastName;

                            Meteor.call('userSave', form, function (error) {
                                if (error) {
                                    console.log('Oops!');
                                } else {
                                    $mdDialog.hide();
                                    $state.go('scrum/project');
                                    console.log('Saved!');
                                }
                            });
                        }
                    },
                    function (err) {
                        $scope.error = 'Registration error - ' + err;
                    }
                );
            } else {
                $scope.error = 'Registration error - Confirm password!';
            }
        };

        //vm.title = 'Scrum';

        $scope.close = function () {
            $mdDialog.hide();
        }
    }
]);