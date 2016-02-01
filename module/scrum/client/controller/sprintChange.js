//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('SprintChangeCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$rootScope', '$mdDialog', '$stateParams', '$reactive',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $meteor, $rootScope, $mdDialog, $stateParams, $reactive) {
        $reactive(this).attach($scope);
        //projectId = $stateParams.id;
        //$scope.form.projectId = projectId;
        //$scope.sprints = Meteor.call('sprintFindAllByProject', projectId, function(erro, result){return result;});
        //if (id) {
        //    $scope.form = Story.findOne(id);
        //} else {
        //    $scope.form = {};
        //}

        this.subscribe('sprint');
        //$scope.helpers({
        //    sprints: function () {
        //        return Sprint.find({$and: [{projectId: $stateParams.id}]}).map(function(sprint){
        //            sprint.dateStartTreated = moment.unix(sprint.dateStart).calendar('L');
        //            sprint.dateEndTreated = moment.unix(sprint.dateEnd).calendar('L');
        //            return sprint;
        //        });
        //    },
        //    sprint: function () {
        //        return Sprint.findOne({$and: [{projectId: $stateParams.id}]});
        //    }
        //});
        $scope.form = [];
        $scope.sprints =  Sprint.find({$and: [{projectId: $stateParams.id}]}).map(function(sprint){
            sprint.dateStartTreated = moment(sprint.dateStart, 'x').format('L');
            sprint.dateEndTreated = moment(sprint.dateEnd, 'x').format('L');
            return sprint;
        });

        dateNow = moment().format('x');
        $scope.form.sprint = Sprint.findOne(
            {
                $and: [
                    {projectId: $stateParams.id},
                    {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
                ]
            }
        )._id;

        $scope.save = function () {
            Meteor.call('storySave', $scope.form, function (error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Saved!');
                    $scope.form = '';
                    $mdDialog.hide();
                }
            });
        };

        $scope.close = function () {
            $mdDialog.hide();
        }
    }
]);