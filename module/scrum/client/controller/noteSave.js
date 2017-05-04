angular.module('scrum').controller('NoteSaveCtrl',
    function ($scope, $mdDialog, id, storyId, sprint, $stateParams, $reactive, $translate, $document) {
        $reactive(this).attach($scope);
        //this.subscribe('users');
        // Meteor.subscribe('project');

        project = Project.findOne({'namespace': $stateParams.id});
        if (project) {
            $stateParams.id = project._id;
        }

        // $document.ready(() => {
        //     console.log($("#description"));
        //     $("#description").keypress(function (e) {
        //         console.log('teste');
        //         if(e.which == 13 && !e.shiftKey) {
        //             console.log('teste2');
        //             $(this).closest("form").submit();
        //             e.preventDefault();
        //             return false;
        //         }
        //     });
        // });

        // Meteor.subscribe('team');
        // Meteor.subscribe('note');
        // Meteor.subscribe('story');
        // Meteor.subscribe('users');
        this.form = {};
        if (id) {
            this.form = Note.findOne(id);
            this.projectIdOld = this.form.projectId;
            this.action = 'Edit';
        } else {
            this.form.projectId = $stateParams.id;
            this.form.time = 1;
            this.action = 'Insert';
        }

        if (sprint) {
            this.form.sprintId = Sprint.findOne({projectId: $stateParams.id, number: parseInt($stateParams.sprint)})._id;
        }

        if (storyId) {
            this.form.story = storyId;
            this.form.sprintId = Sprint.findOne({projectId: $stateParams.id, number: parseInt($stateParams.sprint)})._id;
            this.form.owner = Meteor.userId();
        }

        this.helpers({
            stories: () => {
                return Story.find({projectId: $stateParams.id, $or: [{trash: false}, {trash: null}, {_id: this.form.story}]}, {sort: {name: 1}});
            },
            members: () => {
                project = Project.findOne($stateParams.id);
                usersId = [];
                if (project && project.teams) {
                    teams = Team.find({_id: {$in: project.teams}}, {sort: {name: 1}}).fetch().map(function(team){
                        if (team.members) {
                            team.members.map(function(userId){
                                usersId.push(userId);
                            });
                        }
                        return team.members;
                    });
                }
                if (this.form && this.form.owner){
                    usersId.push(this.form.owner);
                }
                users = Meteor.users.find({_id: {$in: usersId}}, {sort: {name: 1, lastName: 1}});
                return users;
            },
            projects: () => {
                teamsId = Team.find({$or: [{members: Meteor.userId()}, {userId: Meteor.userId()}]}, {sort: {name: 1}}).map(function(member){
                    return member._id;
                });
                projects = Project.find({$or: [{userId: Meteor.userId()}, {teams: {$in: teamsId}}]}, {sort: {name: 1}});
                return projects;
            }
        });
        this.save = () => {
            Meteor.call('noteSave', this.form, (error) => {

                if (this.projectIdOld != this.form.projectId) {
                    this.form.story = '';
                    this.form.sprintId = '';
                    this.form.statusId = '';
                }

                if (error) {
                    $('md-dialog').animateCss('jello');
                    Materialize.toast($translate.instant('Notice') + ': '+ $translate.instant(error.reason) + '!', 4000, 'rounded red accent-1');
                } else {
                    Materialize.toast($translate.instant('Saved successfully') + '!', 4000, 'rounded green accent-1 green-text text-darken-4');
                    $mdDialog.hide();
                }
            });
        };

        this.close = () => {
            $mdDialog.hide();
        }
    }
);