//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('SprintChangeCtrl', [ '$scope', '$rootScope', '$mdDialog', '$stateParams', '$reactive', '$state',
    function ($scope, $rootScope, $mdDialog, $stateParams, $reactive, $state) {
        $reactive(this).attach($scope);
        //projectId = $stateParams.id;
        //$scope.form.projectId = projectId;
        //$scope.sprints = Meteor.call('sprintFindAllByProject', projectId, function(erro, result){return result;});
        //if (id) {
        //    $scope.form = Story.findOne(id);
        //} else {
        //    $scope.form = {};
        //}

        Meteor.subscribe('sprint');
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
            if (typeof(sprint.dateStart) === 'string') {
                sprint.dateStartTreated = moment(sprint.dateStart, 'x').format('L');
            } else {
                sprint.dateStartTreated = moment(sprint.dateStart).format('L');
            }
            if (typeof(sprint.dateEnd) === 'string') {
                sprint.dateEndTreated = moment(sprint.dateEnd, 'x').format('L');
            } else {
                sprint.dateEndTreated = moment(sprint.dateEnd).format('L');
            }
            return sprint;
        });

        dateNow = moment().format('x');

        if ($stateParams.sprintId == '1') {
            var sprint = Sprint.findOne(
                {
                    $and: [
                        {projectId: $stateParams.id},
                        {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
                    ]
                }
            );
            console.log(sprint);
            if (sprint) {
                $scope.form.sprintId = sprint._id;
            }
        } else {
            $scope.form.sprintId = $stateParams.sprintId;
        }

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
        };

        $scope.change = function (sprintId) {
            $mdDialog.hide();
            var link = 'scrum/productkanban';
            $state.go(link, {id: $stateParams.id, sprintId: sprintId});
        }
    }
]);