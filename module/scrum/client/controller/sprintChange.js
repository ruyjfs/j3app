//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('SprintChangeCtrl', ['$scope', '$rootScope', '$mdDialog', '$stateParams', '$reactive', '$state',
    function ($scope, $rootScope, $mdDialog, $stateParams, $reactive, $state) {
        $reactive(this).attach($scope);
        this.subscribe('sprint');
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

        var product = {};
        if ($stateParams.organization == 'organization') {
            product = Project.findOne($stateParams.product);
        } else {
            organization = Organization.findOne({$or: [{_id: $stateParams.organization}, {namespace: $stateParams.organization}]});
            product = Project.findOne({$or: [{$and: [{organization: organization._id}, {namespace: $stateParams.product}]}, {_id: $stateParams.product}]});
        }
        //$stateParams.sprintId = sprint._id;
        $scope.form = [];
        $scope.sprints = Sprint.find({$and: [{projectId: product._id}]}, {sort: {number: 1}}).map(function (sprint) {
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
        //dateNow = moment().format('x');
        //if ($stateParams.sprintId == '1') {
        //    var sprint = Sprint.findOne(
        //        {
        //            $and: [
        //                {projectId: $stateParams.id},
        //                {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
        //            ]
        //        }
        //    );
        //    if (!sprint) {
        //        dateNow = moment()._d;
        //        var sprint = Sprint.findOne(
        //            {
        //                $and: [
        //                    {projectId: $stateParams.id},
        //                    {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
        //                ]
        //            }
        //        );
        //    }
        //    if (sprint) {
        //        $scope.form.sprintId = sprint._id;
        //    }
        //} else {
            $scope.form.sprintNumber = $stateParams.sprint;
        //}

        $scope.close = function () {
            $mdDialog.hide();
        };

        $scope.change = function (sprintNumber) {
            var link = 'scrum/organization/product/kanban';
            param = {};
            param.organization = $stateParams.organization;
            param.product = $stateParams.product;
            param.sprint = sprintNumber;

            sprint = Sprint.findOne({projectId: product._id, number: parseInt($stateParams.sprint)});
            paramForm = {};
            paramForm.projectId = product._id;
            paramForm.sprintId = sprint._id;
            Meteor.call('sprintFindNext', paramForm, function (error) {
                if (error) {
                } else {
                    $scope.form = '';
                    //$mdDialog.hide();
                }
            });
            $state.go(link, param);
            $('#logo-middle').removeClass('animated flip').hide().show().addClass('animated flip');
            $mdDialog.hide();
            $rootScope.$emit('someEvent', param);
        }
    }
]);