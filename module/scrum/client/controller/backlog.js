angular.module('scrum').controller('BacklogCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$reactive', '$stateParams', '$rootScope',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $reactive, $stateParams, $rootScope) {
        $reactive(this).attach($scope);



        //console.log('$rootScope.sprint');
        //console.log($rootScope.sprint);

        //$scope.notesBackLog = [];
        //Meteor.call('noteFindBackLog', {projectId: $stateParams.id}, function (error, result) {
        //    $scope.notesBackLog = result;
        //});

        //$scope.notesBackLog = Session.get('notesBackLog');
//console.log(Session.get('notesBackLog'));
        //$scope.sprintCurrent = {};
        //var sprint = Session.get('sprintCurrent');
        this.helpers({
            notesBackLog: function () {
                Meteor.subscribe('note');
                notes = Note.find({$or: [{projectId: $stateParams.id}, {projectId: null}]}).fetch();
                notes.map(function(note){
                    note.story = Story.findOne(note.story);
                    note.owner = Meteor.users.findOne(note.owner);
                    return note;
                });
                return notes;
            },
            //sprintCurrents: function() {
            //    this.subscribe('sprint');
            //    dateNow = moment().format('x');
            //    //sprintCurrent = Sprint.findOne(
            //    //    {
            //    //        $and: [
            //    //            {projectId: $stateParams.id},
            //    //            {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
            //    //        ]
            //    //    }
            //    //);
            //    //if (sprintCurrent) {
            //    //    sprintCurrent.dateStartTreated = moment(sprintCurrent.dateStart, 'x').format('L');
            //    //    sprintCurrent.dateEndTreated = moment(sprintCurrent.dateEnd, 'x').format('L');
            //    //}
            //    //return sprintCurrent;
            //}
            sprintPrevious: function() {
                Meteor.subscribe('sprint');
                dateNow = moment().format('x');
                sprint = Sprint.findOne(
                    {
                        $and: [
                            {projectId: $stateParams.id},
                            {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
                        ]
                    }
                );
                if (sprint) {
                    sprint.dateStartTreated = moment(sprint.dateStart, 'x').format('L');
                    sprint.dateEndTreated = moment(sprint.dateEnd, 'x').format('L');
                }
                $scope.sprintPrevious = sprint;
                return sprint;
            },
            sprintCurrent: function() {
                Meteor.subscribe('sprint');
                dateNow = moment().format('x');
                if (sprint) {
                    sprint = Sprint.findOne(
                        {
                            $and: [
                                {_id: sprint._id},
                            ]
                        }
                    );
                } else {
                    sprint = Sprint.findOne(
                        {
                            $and: [
                                {projectId: $stateParams.id},
                                {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
                            ]
                        }
                    );
                }
                if (sprint) {
                    sprint.dateStartTreated = moment(sprint.dateStart, 'x').format('L');
                    sprint.dateEndTreated = moment(sprint.dateEnd, 'x').format('L');
                }
                $scope.sprintCurrent = sprint;
                return sprint;
            },
            sprintNext: function() {
                //console.log('sprint');
                //console.log(sprint);
                Meteor.subscribe('sprint');
                dateNow = moment().format('x');
                sprint = Sprint.findOne(
                    {
                        $and: [
                            {projectId: $stateParams.id},
                            {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
                        ]
                    }
                );
                //console.log(sprint);
                //sprintNextNumber = sprint.number + 1;
                //
                //sprintNext = Sprint.findOne({projectId: $stateParams.id, number: sprintNextNumber});
                ////sprint = Sprint.findOne(
                ////    {
                ////        $and: [
                ////            {projectId: $stateParams.id},
                ////            {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
                ////            //{number: sprint.number + 1}
                ////        ]
                ////    }
                ////);
                //if (sprintNext) {
                //    sprintNext.dateStartTreated = moment(sprintNext.dateStart, 'x').format('L');
                //    sprintNext.dateEndTreated = moment(sprintNext.dateEnd, 'x').format('L');
                //}
                //$scope.sprintNext = sprintNext;
                //return sprintNext;
            }
        });
}]);
