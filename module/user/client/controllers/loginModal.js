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
                    //$scope.error = 'User not found';
                    Materialize.toast('User not found!', 4000);
                } else {
                    $mdDialog.hide();
                    $state.go('scrum/product');
                }
            });
        };

        $scope.reset = function () {
            Accounts.forgotPassword($scope.dataForm.email, function(err) {
                    if (err) {
                        //$scope.error = 'Error sending forgot password email - ' + err;
                        Materialize.toast('Error sending forgot password email - ' + err, 4000);
                    } else {
                        $mdDialog.hide();
                        $state.go('scrum/product');

                    }
                }
            );
        };

        $scope.register = function () {

            if (!$scope.dataForm.name || !$scope.dataForm.lastName) {
                //$scope.error = 'Registration error - Inform you name';
                Materialize.toast('Registration error - Inform you name', 4000);
            } else if ($scope.dataForm.password == $scope.dataForm.confirmPassword) {
                Accounts.createUser($scope.dataForm, function (err) {
                        if (err) {
                            //$scope.error = 'Registration error - ' + err;
                            error = 'Registration error - ' + err;
                            Materialize.toast(error, 4000);
                        } else {
                            var form = Meteor.users.findOne(Meteor.user()._id);
                            form.name = $scope.dataForm.name;
                            form.lastName = $scope.dataForm.lastName;

                            Meteor.call('userSave', form, function (error) {
                                if (error) {
                                    //console.log('Oops!');
                                    Materialize.toast(error, 4000);
                                } else {
                                    $mdDialog.hide();
                                    $state.go('scrum/product');
                                    console.log('Saved!');
                                }
                            });
                        }
                    },
                    function (err) {
                        //$scope.error = 'Registration error - ' + err;
                        error = 'Registration error - ' + err;
                        Materialize.toast(error, 4000);
                    }
                );
            } else {
                error = 'Registration error - Confirm password!';
                Materialize.toast(error, 4000);
            }
        };

        //vm.title = 'Scrum';

        $scope.close = function () {
            $mdDialog.hide();
        }
    }
]);