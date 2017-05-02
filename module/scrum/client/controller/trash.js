angular.module('scrum').controller('TrashCtrl',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $stateParams, $reactive, $mdToast) {
        $reactive(this).attach($scope);
        $scope.booLoading = false;
        $('#progressBar').fadeOut('slow');
});