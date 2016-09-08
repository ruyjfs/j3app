angular.module("user").controller("ResetCtrl", ['$scope', '$reactive', '$state',
    function ($scope, $reactive, $state) {
        $reactive(this).attach($scope);

        $scope.dataForm = {
            email: ''
        };

        $scope.error = '';

        $scope.reset = function () {
            $scope.credentials = {
                email: $scope.dataForm.email,
                subject: "Reset your password on j3scrum.",
                siteName: "j3scrum",
                from: '"j3scrum Accounts" <no-reply@j3scrum.com>'
            };

            //Accounts.emailTemplates.siteName = "j3scrum";
            //Accounts.emailTemplates.from = '"j3scrum Accounts" <no-reply@j3scrum.com>';
            //Accounts.emailTemplates.headers = 'Olá. Para resetar sua senha é simples, basta clicar no link abaixo.';
            Accounts.forgotPassword($scope.credentials, function(err){
                if (err) {
                    $scope.error = 'Error sending forgot password email - ' + err;
                } else {
                    $state.go('scrum/organization');
                }
            });
        };
    }
]);