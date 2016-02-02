angular.module("user").controller("Default2Ctrl", ['$scope', '$reactive', '$state', '$mdDialog',
    function($scope, $reactive, $state, $mdDialog){
        $reactive(this).attach($scope);

        this.teste = 'haha11';
        $scope.teste2 = 'haha22';

        this.modalContactSave = function(ev, id){
            $mdDialog.show({
                controller: 'ContactSaveCtrl',
                templateUrl: 'module/user/client/views/contact-save.ng.html',
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
    }
]);
