//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('SprintChangeCtrl', ['$scope', '$rootScope', '$mdDialog', '$stateParams', '$reactive', '$state',
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
        this.subscribe('sprint');
        $scope.form = [];
        $scope.sprints = Sprint.find({$and: [{projectId: $stateParams.id}]}, {sort: {number: 1}}).map(function (sprint) {
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
        // tel 01143260351
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
            if (!sprint) {
                dateNow = moment()._d;
                var sprint = Sprint.findOne(
                    {
                        $and: [
                            {projectId: $stateParams.id},
                            {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
                        ]
                    }
                );
            }
            if (sprint) {
                $scope.form.sprintId = sprint._id;
            }
        } else {
            $scope.form.sprintId = $stateParams.sprintId;
        }

        $scope.save = function () {
            Meteor.call('storySave', $scope.form, function (error) {
                if (error) {
                } else {
                    $scope.form = '';
                    $mdDialog.hide();
                }
            });
        };

        $scope.close = function () {
            $mdDialog.hide();
        };

        $scope.change = function (sprintId) {
            var link = 'scrum/productkanban';
            param = {};
            param.projectId = $stateParams.id;
            param.sprintId = sprintId;
            Meteor.call('sprintFindNext', param, function (error) {
                if (error) {
                } else {
                    $scope.form = '';
                    //$mdDialog.hide();
                }
            });
            $state.go(link, {id: $stateParams.id, sprintId: sprintId});
            $('#logo-middle').removeClass('animated flip').hide().show().addClass('animated flip');
            $mdDialog.hide();
            $rootScope.$emit('someEvent', param);
        }
    }
]);