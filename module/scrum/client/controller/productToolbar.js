//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('ProductToolbarCtrl', ['$scope', '$mdDialog', '$stateParams', '$reactive', '$state', '$timeout', '$rootScope', '$location',
    function ($scope, $mdDialog, $stateParams, $reactive, $state, $timeout, $rootScope, $location) {
        $reactive(this).attach($scope);
        $scope.$location = $location;
        if (!$stateParams.product) {
            $state.go('scrum');
        }

        this.subscribe('users');
        this.subscribe('organization');
        this.subscribe('project');
        this.subscribe('team', function(){return [$stateParams.organization]});
        //this.subscribe('status', function(){return [$stateParams.product]});
        //this.subscribe('note', function(){return [$stateParams.product]});
        //this.subscribe('story', function(){return [$stateParams.product]});
        this.subscribe('sprint', function(){return [$stateParams.product]});
        $scope.helpers({
            organizationId: function(){
                var id = 'organization';
                if ($stateParams.organization !== 'organization') {
                    var organization = Organization.findOne({$or: [{_id: $stateParams.organization}, {namespace: $stateParams.organization}]});
                    if (organization) {
                        id = organization._id;
                    } else {
                        id = $stateParams.organization;
                    }
                }
                return id;
            },
            productId: function(){
                var organizationId = this.getReactively('organizationId');
                var id = 0;
                if (organizationId) {
                    if (organizationId === 'organization') {
                        product = Project.findOne($stateParams.product);
                    } else {
                        product = Project.findOne({$or: [{$and: [{organization: organizationId}, {namespace: $stateParams.product}]}, {_id: $stateParams.product}]});
                    }
                    if (product) {
                        id = $stateParams.id = product._id;
                    } else {
                        id = $stateParams.id;
                    }
                }
                return id;
            },
            sprintId: function() {
                var id = 0;
                var productId = this.getReactively('productId');
                if (productId) {
                    var sprint = Sprint.findOne({$or: [{$and: [{projectId: productId}, {number: parseInt($stateParams.sprint)}]}, {_id: $stateParams.sprint}]});
                    if (sprint) {
                        id = sprint._id;
                    } else {
                        id = $stateParams.sprint;
                    }
                }
                return id;
            },
            sprint: function () {
                var productId = this.getReactively('productId');
                var sprintId = this.getReactively('sprintId');
                dateNow = moment().format('x');
                if (sprintId == '1' || sprintId == '') {
                    sprint = Sprint.findOne(
                        {
                            $and: [
                                {projectId: productId},
                                {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
                            ]
                        }
                    );
                    if (!sprint) {
                        dateNow = moment()._d;
                        sprint = Sprint.findOne(
                            {
                                $and: [
                                    {projectId: productId},
                                    {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
                                ]
                            }
                        );
                    }
                } else {
                    sprint = Sprint.findOne(sprintId);
                }
                if (sprint) {
                    project = Project.findOne(productId);

                    if (typeof(sprint.dateStart) === 'string') {
                        sprint.dateStartTreated = moment(sprint.dateStart, 'x').format('L');
                        sprint.dateEndTreated = moment(sprint.dateEnd, 'x').format('L');
                        sprint.days = moment(sprint.dateEnd, 'x').diff(moment(sprint.dateStart, 'x'), 'days') + 1;
                    } else {
                        sprint.dateStartTreated = moment(sprint.dateStart).format('L');
                        sprint.dateEndTreated = moment(sprint.dateEnd).format('L');
                        sprint.days = moment(sprint.dateEnd).diff(moment(sprint.dateStart), 'days') + 1;
                    }

                    if (project && project.skipWeekend) {
                        if (typeof(sprint.dateStart) === 'string') {
                            sprint.daysBusiness = moment(sprint.dateEnd, 'x').businessDiff(moment(sprint.dateStart, 'x'), 'days');
                        } else {
                            sprint.daysBusiness = moment(sprint.dateEnd).businessDiff(moment(sprint.dateStart), 'days');
                        }
                        sprint.days = sprint.daysBusiness;
                    }
                    if (project && project.teams) {
                        teams = Team.find({_id: {$in: project.teams}}).fetch().map(function (team) {
                            if (team.members) {
                                team.members = Meteor.users.find({_id: {$in: team.members}}).fetch();
                                team.membersTotal = team.members.length;
                                team.timeTotal = team.membersTotal * team.time;
                            }
                            return team;
                        });
                    } else {
                        teams = [];
                    }

                    if (teams) {
                        timeTotal = 0;
                        teams.forEach(function (value) {
                            if (isInt(parseInt(value.timeTotal))) {
                                timeTotal = parseInt(value.timeTotal) + timeTotal;
                            }
                        });

                        sprint.timeTotal = timeTotal * sprint.days;
                    } else {
                        sprint.timeTotal = 0;
                    }

                    notes = Note.find({
                        $and: [{sprintId: sprintId}],
                        $or: [{projectId: productId}, {projectId: null}]
                    }).fetch();
                    notes.map(function (note) {
                        note.story = Story.findOne(note.story);
                        note.owner = Meteor.users.findOne(note.owner);
                        if (note.statusId == '1') {
                            note.color = '#dbdbdb';
                        } else {
                            if (note.story) {
                                note.color = note.story.color;
                            } else {
                                note.story = '#000';
                            }
                        }
                        return note;
                    });

                    if (notes) {
                        timeTotal = 0;
                        notes.forEach(function (value) {
                            //console.log(value);
                            if (isInt(parseInt(value.time))) {
                                timeTotal = parseInt(value.time) + timeTotal;
                            }
                        });
                        sprint.timeTotalNotes = timeTotal;
                    } else {
                        sprint.timeTotalNotes = 0;
                    }

                    notesDone = Note.find({
                        $and: [{sprintId: sprintId}, {statusId: '1'}],
                        $or: [{projectId: productId}, {projectId: null}]
                    }).fetch();
                    //console.log(notesDone);
                    if (notesDone) {
                        timeTotal = 0;
                        notesDone.forEach(function (value) {
                            //console.log(value);
                            if (isInt(parseInt(value.time))) {
                                timeTotal = parseInt(value.time) + timeTotal;
                            }
                        });
                        sprint.timeTotalNotesDone = timeTotal;
                    } else {
                        sprint.timeTotalNotesDone = 0;
                    }

                    //console.log('sprint.timeTotalNotesDone');
                    //console.log(sprint.timeTotalNotesDone);
                    //console.log(sprint.timeTotal);
                    //console.log(sprint.timeTotalNotes);

                    //if (sprint && sprint.timeTotalNotesDone && sprint.timeTotalNotes && sprint.timeTotal) {
                    sprint.progressDone = sprint.timeTotalNotesDone * 100 / sprint.timeTotal;
                    sprint.progress = sprint.timeTotalNotes * 100 / sprint.timeTotal;
                    //} else {
                    //    sprint.progressDone = 0;
                    //    sprint.progress = 0;
                    //}
                    //console.log(sprint.dateStart);
                    //console.log(sprint.progress);
                    if (typeof(sprint.dateStart) === 'string') {
                        $rootScope.titleMiddle = ' #' + sprint.number + ' ' + moment(sprint.dateStart, 'x').format('L') + ' - ' + moment(sprint.dateEnd, 'x').format('L');
                    } else {
                        $rootScope.titleMiddle = ' #' + sprint.number + ' ' + moment(sprint.dateStart).format('L') + ' - ' + moment(sprint.dateEnd).format('L');
                    }
                    //sprint.hoursMember = project.ti;
                }

                $rootScope.sprint = sprint;
                return sprint;
            },
        });


        var organization = $stateParams.organization;
        var product = $stateParams.product;
        var sprint = $stateParams.sprint;

        if (typeof organization == 'undefined') {
            organization = 0;
        }

        this.menus = [
            {name: 'Home',     link: '/scrum/organizations', icon: 'home',   class: ''},
            // {name: 'Organization',     link: '/scrum/organization', icon: 'location_city',   class: ''},
            {name: 'Products',          link: '/scrum/' + organization + '/products',      icon: 'business_center',      class: ''},
            {name: 'Teams',             link: '/scrum/' + organization + '/teams',         icon: 'group_work', class: ''},
            {name: 'Product',          link: '/scrum/' + organization + '/' + product + '/' + sprint,      icon: 'business_center',      class: ''},
            {name: 'Kanban',           link: '/scrum/' + organization + '/' + product +'/kanban/'+ sprint,   icon: 'view_column',     class: ''},
            // {name: 'Task List',        link: '/scrum/' + organization + '/' + product +'/task-list/'+ sprint,   icon: 'view_list',     class: ''},
            {name: 'Backlog',          link: '/scrum/' + organization + '/' + product +'/backlog/'+ sprint,  icon: 'developer_board', class: ''},
            {name: 'Burndown',         link: '/scrum/' + organization + '/' + product +'/burndown/'+ sprint, icon: 'trending_down',       class: ''},
            {name: 'Planning Poker',   link: '/scrum/' + organization + '/' + product +'/planning-poker/'+ sprint,  icon: 'style', class: ''},
            {name: 'Story',            link: '/scrum/' + organization + '/' + product +'/story/'+ sprint,    icon: 'content_paste',   class: ''},
            {name: 'Status',           link: '/scrum/' + organization + '/' + product +'/status/'+ sprint,   icon: 'flag',           class: ''},
            {name: 'Sprint',           link: '/scrum/' + organization + '/' + product +'/sprint/'+ sprint,   icon: 'date_range',      class: ''},
            {name: 'Members',          link: '/scrum/' + organization + '/' + product +'/product-team/'+ sprint,     icon: 'group',   class: ''},
            {name: 'Trash',            link: '/scrum/' + organization + '/' + product +'/trash/'+ sprint,   icon: 'delete',      class: ''}
            //{name: 'Burndown',  link: '/scrum/burndown/'+this.id+'/'+this.sprintId, icon: 'show_chart',       class: ''},
            //{name: 'Product',   link: '/scrum/product', icon: 'business_center'}
        ];
        if ($location.path()) {
            arrUrl = $location.path().split('/');
            urlModule = arrUrl[2];
        }
        this.menus.map(function(menu){
            links = menu.link.split('/');
            if (arrUrl[2] == links[2] && arrUrl[3] == links[3] && arrUrl[4] == links[4] ) {
                menu.class = 'active active-margin'
            }
            return menu;
        });

        $scope.modalNoteSave = function (ev, id, storyId) {
            $mdDialog.show({
                controller: 'NoteSaveCtrl',
                templateUrl: 'module/scrum/client/view/note-save.ng.html',
                clickOutsideToClose: true,
                targetEvent: ev,
                locals: {
                    id: id,
                    storyId: storyId,
                    sprint: ''
                }
            }).then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
        };

        $scope.modalStorySave = function (ev, id) {
            $mdDialog.show({
                controller: 'StorySaveCtrl',
                templateUrl: 'module/scrum/client/view/story-save.ng.html',
                clickOutsideToClose: true,
                locals: {id: id},
                targetEvent: ev
            });
        };

        $scope.modalStatusSave = function (ev, id) {
            $mdDialog.show({
                controller: 'StatusSaveCtrl',
                templateUrl: 'module/scrum/client/view/status-save.ng.html',
                clickOutsideToClose: true,
                locals: {'id': id},
                targetEvent: ev
            }).then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
        };

        $(document).ready(function () {
            $('.showMenu').on('click', function () {
                var elm = $(this),
                    elmMenu = elm.closest('.menu'),
                    elmMenu2 = $('.menu2'),
                    elmContent = $('.dynamic .content-main');
                if (elmMenu.hasClass('extended')) {
                    elmMenu.removeClass('extended');
                    elmMenu2.removeClass('extended');
                    elmContent.removeClass('extended');
                    elmMenu.find('.material-icon').removeClass('arrow').addClass('hamburger');
                } else {
                    elmMenu.addClass('extended');
                    elmMenu2.addClass('extended');
                    elmContent.addClass('extended');
                    elmMenu.find('.material-icon').removeClass('hamburger').addClass('arrow');
                }
            });
        });
    }]);