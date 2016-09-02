//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('TrashCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$stateParams', '$reactive', '$mdToast',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $stateParams, $reactive, $mdToast) {
        $reactive(this).attach($scope);
}]);