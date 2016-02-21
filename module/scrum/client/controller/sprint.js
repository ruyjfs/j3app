//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('SprintCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$reactive', '$stateParams',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $reactive, $stateParams) {
        $reactive(this).attach($scope);

        Meteor.subscribe('sprint');
        this.helpers({
            sprints: function () {
                return Sprint.find({$or: [{projectId: $stateParams.id}, {projectId: null}]}).map(function(sprint){
                    //sprint.dateStartTreated = moment(sprint.dateStart).format('x');
                    //sprint.dateEndTreated = moment.unix(sprint.dateStart).calendar('L');
                    //sprint.dateStartTreated = moment(new Date(sprint.dateStart)).format('L');
                    //sprint.dateStartTreated = moment(new Date(1454205600000).toISOString()).calendar('L');
                    //sprint.dateStartTreated = moment(new Date(sprint.dateStart)).format('L');
                    //console.log(new Date(1454205600000));
                    //console.log(sprint.dateStart);
                    //sprint.dateStartTreated = moment(new Date(1454205600000)).format('L');
                    //sprint.dateEndTreated = moment(new Date(sprint.dateEnd)).format('L');
                    sprint.dateStartTreated = moment(sprint.dateStart, 'x').format('L');
                    sprint.dateEndTreated = moment(sprint.dateEnd, 'x').format('L');
                    //$log.debug(sprint.dateEnd);
                    //sprint.dateStartTreated = moment(sprint.dateEnd).calendar('L');
                    //sprint.dateEndTreated = moment.unix(sprint.dateEnd).calendar('L');
                    return sprint;
                });
            }
        });
        //$scope.sprints =  Sprint.find({$and: [{projectId: $stateParams.id}]}).map(function(sprint){
        //    sprint.dateStartTreated = moment.unix(sprint.dateStart).calendar('L');
        //    sprint.dateEndTreated = moment.unix(sprint.dateEnd).calendar('L');
        //    return sprint;
        //});

        //this.sprints = function () {
        //    teste = Sprint.find({$or: [{projectId: $stateParams.id}, {projectId: null}]});
        //    console.log(teste.fetch());
        //    console.log('aqui');
        //    return teste;
        //}

//        $scope.subscribe('sprint');
//        sprints = Sprint.find({$or: [{projectId: $stateParams.id}, {projectId: null}]}).fetch();
//console.log(sprints);
//console.log('sprints');

        this.modalSave = function(ev, id){
            $mdDialog.show({
                controller: 'SprintSaveCtrl',
                templateUrl: 'module/scrum/client/view/sprint-save.ng.html',
                clickOutsideToClose:true,
                locals: {id: id},
                targetEvent: ev
            });
        };
}]);