//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('user').controller('LoginModalCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$mdDialog', '$state', '$reactive', '$document',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $mdDialog, $state, $reactive, $document) {
        // var response = vcRecaptchaService.getResponse("recaptcha-1");
        // console.info(vcRecaptchaService.);
        // console.info(response);
        $reactive(this).attach($scope);
        this.subscribe('users');

        $scope.dataForm = {
            name: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };


        $scope.intCaptchaKey = '6LfzYxsUAAAAAPA9ty6hk__9X9k5Jf2UqcGosT62';

        $scope.recaptcha = {
            response : null,
            widgetId : null,
            key : "6LfzYxsUAAAAAPA9ty6hk__9X9k5Jf2UqcGosT62"
        };

        let intTry = 0;

        $scope.error = '';
        let intCatpchaIdReset = false;
        $scope.renderCaptchaReset = () => {
            if ($('#recaptcha-reset').is(':empty')) {
                intCatpchaIdReset = grecaptcha.render('recaptcha-reset', {
                    'sitekey' : '6LfzYxsUAAAAAPA9ty6hk__9X9k5Jf2UqcGosT62'
                });
            }
        };
        let intCatpchaIdCreate = false;
        $scope.renderCaptchaCreate = () => {
            if ($('#recaptcha-create').is(':empty')) {
                intCatpchaIdCreate = grecaptcha.render('recaptcha-create', {
                    'sitekey' : '6LfzYxsUAAAAAPA9ty6hk__9X9k5Jf2UqcGosT62'
                });
            }
        };

        let intCatpchaIdLogin;
        $scope.login = function () {
            intTry += 1;
            if (intTry == 4) {
                intCatpchaIdLogin = grecaptcha.render('recaptcha-login', {
                    'sitekey' : '6LfzYxsUAAAAAPA9ty6hk__9X9k5Jf2UqcGosT62'
                });
            }

            if (intTry < 4 ||  intTry > 4 && grecaptcha.getResponse(intCatpchaIdLogin)) {
                Meteor.loginWithPassword(this.dataForm.email, this.dataForm.password, function(err) {
                    if (err) {
                        Materialize.toast('User not found!', 4000);
                    } else {
                        $mdDialog.hide();
                        $state.go('scrum/organization');
                    }
                });
            } else if (intTry > 4 && !grecaptcha.getResponse(intCatpchaIdLogin)) {
                Materialize.toast('Check if you are a robot!', 4000);
            }
        };

        $scope.reset = function () {
            if (!grecaptcha.getResponse(intCatpchaIdReset)) {
                Materialize.toast('Check if you are a robot!', 4000);
                return false;
            }

            $scope.credentials = {
                email: $scope.dataForm.email
            };

// console.log('aeeee');
//             Accounts.emailTemplates.resetPassword.text
//             Accounts.emailTemplates.resetPassword.siteName = "j3scrum";
//             Accounts.emailTemplates.resetPassword.from = '"j3scrum Accounts" <no-reply@j3scrum.com>';
//             Accounts.emailTemplates.resetPassword.headers = 'Olá. Para resetar sua senha é simples, basta clicar no link abaixo.';
            Accounts.forgotPassword.from = "j3scrum Reset Password <no-reply@j3scrum.com>";
            // Accounts.emailTemplates.from = "j3scrum Reset Password <no-reply@j3scrum.com>";
            Accounts.forgotPassword($scope.credentials, function(err) {
                    if (err) {
                        Materialize.toast('Error sending forgot password email - ' + err, 4000);
                    } else {
                        Materialize.toast('Check the link in your email to reset the password.', 4000);
                    }
                    console.log(err);
                }
            );
            console.log('Emvio de email:');
            $mdDialog.hide();
        };

        $scope.register = function () {
            if (!grecaptcha.getResponse(intCatpchaIdCreate)) {
                Materialize.toast('Check if you are a robot!', 4000);
                return false;
            }
            if (!$scope.dataForm.name || !$scope.dataForm.lastName) {
                //$scope.error = 'Registration error - Inform you name';
                Materialize.toast('Registration error - Inform you name', 4000);
            } else if ($scope.dataForm.password == $scope.dataForm.confirmPassword) {

                if ($scope.dataForm.username == '' || $scope.dataForm.username.length < 3 ) {
                    Materialize.toast('Erro: ' + 'Invalid username', 4000);
                } else {

                    usernameExist = Meteor.users.findOne({$and: [{username: $scope.dataForm.username}], _id: {$not: Meteor.userId()}});
                    if (usernameExist) {
                        Materialize.toast('Erro: ' + 'Username already exists', 4000);
                    } else {
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
                                            $state.go('scrum/organization');
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
                    }
                }


            } else {
                error = 'Registration error - Confirm password!';
                Materialize.toast(error, 4000);
            }
        };

        //vm.title = 'Scrum';

        $scope.close = function () {
            $mdDialog.hide();
        };
    }
]);