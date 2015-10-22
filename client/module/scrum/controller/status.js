//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('StatusCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$rootScope',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $meteor, $rootScope) {
        //$scope.title = 'Scrum';

        $scope.test = 'HAHAHAHAA';
        $meteor.subscribe('status');
        $scope.states = $meteor.collection( function() {
            return Status.find(
                {
                    //$or: [
                    //    {
                    //        'userId' : $rootScope.currentUser._id,
                    //        'friendId' : friendId
                    //    }
                    //    ,
                    //    {
                    //        'userId' : friendId,
                    //        'friendId' : $rootScope.currentUser._id
                    //    }
                    //]
                }
            );
        });

        $scope.modalSave = function(ev){
            //$mdDialog.alert()
            //    .parent(angular.element(document.querySelector('#popupContainer')))
            //    .clickOutsideToClose(true)
            //    .title('This is an alert title')
            //    .content('You can specify some description text in here.')
            //    .ariaLabel('Alert Dialog Demo')
            //    .ok('Got it!')
            //    .targetEvent(ev)

            $mdDialog.show({
                controller: 'StatusSaveCtrl',
                templateUrl: 'client/module/scrum/view/status-save.ng.html',
                clickOutsideToClose:true,
                resolve: {
                    //parties: function () {
                    //    return $scope.parties;
                    //}
                },
                targetEvent: ev
            }).then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
        };
}]);