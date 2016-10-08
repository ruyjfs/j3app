angular.module('scrum').controller('BacklogCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$reactive', '$stateParams', '$rootScope',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $reactive, $stateParams, $rootScope) {
        $reactive(this).attach($scope);
        this.subscribe('users');
        this.subscribe('organization');
        this.subscribe('project');
        this.subscribe('status', function(){return [$stateParams.product]});
        this.subscribe('note', function(){return [$stateParams.product]});
        this.subscribe('story', function(){return [$stateParams.product]});
        this.subscribe('sprint', function(){return [$stateParams.product]});
        this.helpers({
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
            notesBackLog: function () {
                var productId = this.getReactively('productId');
                notes = Note.find({$and: [{$or: [{sprintId: null}, {sprintId: ''}]}], $or: [{projectId: productId}, {projectId: null}], $or: [{trash: false}, {trash: null}]}).fetch();
                notes.map(function(note){
                    note.story = Story.findOne(note.story);
                    note.owner = Meteor.users.findOne(note.owner);
                    if (note.owner && note.owner.status) {
                        if (note.owner.status.lastLogin) {
                            if (moment(new Date).diff(moment(note.owner.status.lastLogin.date), 'days') > 2) {
                                note.owner.statusLastLoginDate = moment(note.owner.status.lastLogin.date).format('L H[h]m');
                            } else {
                                note.owner.statusLastLoginDate = moment(note.owner.status.lastLogin.date).fromNow(); // in 40 minutes
                            } 
                        }
                        //console.log(note.owner.status.lastLogin.date);
                        //moment(note.owner.status.lastLogin.date).format('L LT')
                        //note.owner.status.lastLogin.dateTreated = '';
                        if (note.owner.status.idle == true) {
                            note.owner.statusColor = ' #FFC107';
                            note.owner.statusName = ' Away';
                        } else if (note.owner.status.online == true) {
                            note.owner.statusColor = ' #9ACD32';
                            note.owner.statusName = ' Online';
                        } else {
                            note.owner.statusColor = ' rgba(224, 224, 224, 0.77)';
                            note.owner.statusName = ' Offline';
                        }
                    } else {
                        if (!note.owner) {
                            note.owner = {};
                        }
                        note.owner.statusColor = ' rgba(224, 224, 224, 0.77)';
                        note.owner.statusName = ' Offline';
                    }
                    // Imagem do gravatar.
                    if (note.owner.emails && note.owner.emails[0].address) {
                        note.owner.img = 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(note.owner.emails[0].address).toString() + '?s=60&d=mm';
                    } else {
                        note.owner.img = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?s=60&d=mm&f=y';
                    }

                    note.owner.nameTreated = note.owner.name + ' ' + note.owner.lastName;
                    if (note.owner.nameTreated.length > 14) {
                        note.owner.nameTreated = note.owner.nameTreated.substr(0,13) + '...';
                    }
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
                return notes;
            },
            notesSprintPrevious: function () {
                var productId = this.getReactively('productId');
                var sprintId = this.getReactively('sprintId');
                sprint = Sprint.findOne({_id: sprintId});
                notes = [];
                if (sprint) {
                    sprintPreviousNumber = sprint.number - 1;
                    sprintPrevious = Sprint.findOne({projectId: productId, number: sprintPreviousNumber});
                    if (sprintPrevious) {
                        if (typeof(sprintPrevious.dateStart) === 'string') {
                            sprintPrevious.dateStartTreated = moment(sprintPrevious.dateStart, 'x').format('L');
                            sprintPrevious.dateEndTreated = moment(sprintPrevious.dateEnd, 'x').format('L');
                        } else {
                            sprintPrevious.dateStartTreated = moment(sprintPrevious.dateStart).format('L');
                            sprintPrevious.dateEndTreated = moment(sprintPrevious.dateEnd).format('L');
                        }
                        notes = Note.find({$and: [{sprintId: sprintPrevious._id}], $or: [{projectId: productId}, {projectId: null}]}).fetch();
                        notes.map(function(note){
                            note.story = Story.findOne(note.story);
                            note.owner = Meteor.users.findOne(note.owner);
                            if (note.statusId == 1) {
                                note.color = '#dbdbdb';
                            } else {
                                if (note.story) {
                                    note.color = note.story.color;
                                } else {
                                    note.story = '#000';
                                }
                            }
                            if (note.owner && note.owner.status) {
                                if (note.owner.status.lastLogin) {

                                    if (moment(new Date).diff(moment(note.owner.status.lastLogin.date), 'days') > 2) {
                                        note.owner.statusLastLoginDate = moment(note.owner.status.lastLogin.date).format('L H[h]m');
                                    } else {
                                        note.owner.statusLastLoginDate = moment(note.owner.status.lastLogin.date).fromNow(); // in 40 minutes
                                    }
                                }
                                //console.log(note.owner.status.lastLogin.date);
                                //moment(note.owner.status.lastLogin.date).format('L LT')
                                //note.owner.status.lastLogin.dateTreated = '';
                                if (note.owner.status.idle == true) {
                                    note.owner.statusColor = ' #FFC107';
                                    note.owner.statusName = ' Away';
                                } else if (note.owner.status.online == true) {
                                    note.owner.statusColor = ' #9ACD32';
                                    note.owner.statusName = ' Online';
                                } else {
                                    note.owner.statusColor = ' rgba(224, 224, 224, 0.77)';
                                    note.owner.statusName = ' Offline';
                                }
                            } else {
                                if (!note.owner){
                                    note.owner = {};
                                }
                                note.owner.statusColor = ' rgba(224, 224, 224, 0.77)';
                                note.owner.statusName = ' Offline';
                            }
                            // Imagem do gravatar.
                            if (note.owner.emails && note.owner.emails[0].address) {
                                note.owner.img = 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(note.owner.emails[0].address).toString() + '?s=60&d=mm';
                            } else {
                                note.owner.img = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?s=60&d=mm&f=y';
                            }

                            note.owner.nameTreated = note.owner.name + ' ' + note.owner.lastName;
                            if (note.owner.nameTreated.length > 14) {
                                note.owner.nameTreated = note.owner.nameTreated.substr(0,13) + '...';
                            }

                            return note;
                        });
                    }
                }
                return notes;
            },
            notesSprintCurrent: function () {
                var productId = this.getReactively('productId');
                var sprintId = this.getReactively('sprintId');
                notes = Note.find({$and: [{sprintId: sprintId}], $or: [{projectId: productId}, {projectId: null}]}).fetch();
                notes.map(function(note){
                    note.story = Story.findOne(note.story);
                    note.owner = Meteor.users.findOne(note.owner);
                    if (note.statusId == 1) {
                        note.color = '#dbdbdb';
                    } else {
                        if (note.story) {
                            note.color = note.story.color;
                        } else {
                            note.story = '#000';
                        }
                    }
                    if (note.owner && note.owner.status) {
                        if (note.owner.status.lastLogin) {

                            if (moment(new Date).diff(moment(note.owner.status.lastLogin.date), 'days') > 2) {
                                note.owner.statusLastLoginDate = moment(note.owner.status.lastLogin.date).format('L H[h]m');
                            } else {
                                note.owner.statusLastLoginDate = moment(note.owner.status.lastLogin.date).fromNow(); // in 40 minutes
                            }
                        }
                        //console.log(note.owner.status.lastLogin.date);
                        //moment(note.owner.status.lastLogin.date).format('L LT')
                        //note.owner.status.lastLogin.dateTreated = '';
                        if (note.owner.status.idle == true) {
                            note.owner.statusColor = ' #FFC107';
                            note.owner.statusName = ' Away';
                        } else if (note.owner.status.online == true) {
                            note.owner.statusColor = ' #9ACD32';
                            note.owner.statusName = ' Online';
                        } else {
                            note.owner.statusColor = ' rgba(224, 224, 224, 0.77)';
                            note.owner.statusName = ' Offline';
                        }
                    } else {
                        if (!note.owner) {
                            note.owner = {};
                        }
                        note.owner.statusColor = ' rgba(224, 224, 224, 0.77)';
                        note.owner.statusName = ' Offline';
                    }
                    // Imagem do gravatar.
                    if (note.owner.emails && note.owner.emails[0].address) {
                        note.owner.img = 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(note.owner.emails[0].address).toString() + '?s=60&d=mm';
                    } else {
                        note.owner.img = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?s=60&d=mm&f=y';
                    }

                    note.owner.nameTreated = note.owner.name + ' ' + note.owner.lastName;
                    if (note.owner.nameTreated.length > 14) {
                        note.owner.nameTreated = note.owner.nameTreated.substr(0,13) + '...';
                    }
                    return note;
                });
                return notes;
            },
            notesSprintNext: function () {
                var productId = this.getReactively('productId');
                var sprintId = this.getReactively('sprintId');
                sprint = Sprint.findOne({_id: sprintId});
                notes = [];
                if (sprint) {
                    sprintNextNumber = sprint.number + 1;
                    sprintNext = Sprint.findOne({projectId: productId, number: sprintNextNumber});
                    if (sprintNext) {
                        if (typeof(sprintNext.dateStart) === 'string') {
                            sprintNext.dateStartTreated = moment(sprintNext.dateStart, 'x').format('L');
                            sprintNext.dateEndTreated = moment(sprintNext.dateEnd, 'x').format('L');
                        } else {
                            sprintNext.dateStartTreated = moment(sprintNext.dateStart).format('L');
                            sprintNext.dateEndTreated = moment(sprintNext.dateEnd).format('L');
                        }
                        notes = Note.find({$and: [{sprintId: sprintNext._id}], $or: [{projectId: productId}, {projectId: null}]}).fetch();
                        notes.map(function(note){
                            note.story = Story.findOne(note.story);
                            note.owner = Meteor.users.findOne(note.owner);
                            if (note.statusId == 1) {
                                note.color = '#dbdbdb';
                            } else {
                                if (note.story) {
                                    note.color = note.story.color;
                                } else {
                                    note.story = '#000';
                                }
                            }
                            if (note.owner && note.owner.status) {
                                if (note.owner.status.lastLogin) {

                                    if (moment(new Date).diff(moment(note.owner.status.lastLogin.date), 'days') > 2) {
                                        note.owner.statusLastLoginDate = moment(note.owner.status.lastLogin.date).format('L H[h]m');
                                    } else {
                                        note.owner.statusLastLoginDate = moment(note.owner.status.lastLogin.date).fromNow(); // in 40 minutes
                                    }
                                }
                                //console.log(note.owner.status.lastLogin.date);
                                //moment(note.owner.status.lastLogin.date).format('L LT')
                                //note.owner.status.lastLogin.dateTreated = '';
                                if (note.owner.status.idle == true) {
                                    note.owner.statusColor = ' #FFC107';
                                    note.owner.statusName = ' Away';
                                } else if (note.owner.status.online == true) {
                                    note.owner.statusColor = ' #9ACD32';
                                    note.owner.statusName = ' Online';
                                } else {
                                    note.owner.statusColor = ' rgba(224, 224, 224, 0.77)';
                                    note.owner.statusName = ' Offline';
                                }
                            } else {
                                if (!note.owner){
                                    note.owner = {};
                                }
                                note.owner.statusColor = ' rgba(224, 224, 224, 0.77)';
                                note.owner.statusName = ' Offline';
                            }
                            // Imagem do gravatar.
                            if (note.owner.emails && note.owner.emails[0].address) {
                                note.owner.img = 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(note.owner.emails[0].address).toString() + '?s=60&d=mm';
                            } else {
                                note.owner.img = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?s=60&d=mm&f=y';
                            }

                            note.owner.nameTreated = note.owner.name + ' ' + note.owner.lastName;
                            if (note.owner.nameTreated.length > 14) {
                                note.owner.nameTreated = note.owner.nameTreated.substr(0,13) + '...';
                            }
                            return note;
                        });
                    }
                }
                return notes;
            },
            sprint: function () {
                var productId = this.getReactively('productId');
                var sprintId = this.getReactively('sprintId');
                dateNow = moment().format('x');

                if ( productId && (sprintId == '1' || sprintId == '')) {

                    Meteor.call('sprintCreate', productId, function (error, result) {
                        if (error) {
                        } else {
                            //console.log('Saved!');
                            //$scope.form = '';
                            //$mdDialog.hide();
                        }
                        //$rootScope.titleMiddle = result.dateStart + ' - ' + result.dateEnd + ' (' + result.number + ')';
                        $rootScope.titleMiddle = ' (' + result.number + ') ' + moment(result.dateStart).format('L') + ' - ' + moment(result.dateEnd).format('L');

                        if (sprintId == 1 || sprintId == '') {
                            /* @todo arrumar depois */
                            //console.log('Arrumar');
                            //$state.go('scrum/content', {product: productId, sprint: result._id})
                        }
                    });
                    sprint = Sprint.findOne(
                        {
                            $and: [
                                {projectId: productId},
                                {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
                            ]
                        }
                    );
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

                    sprint.progressDone = sprint.timeTotalNotesDone * 100 / sprint.timeTotal;
                    sprint.progress = sprint.timeTotalNotes * 100 / sprint.timeTotal;

                    //console.log(sprint.progress);
                    if (typeof(sprint.dateStart) === 'string') {
                        $rootScope.titleMiddle = ' (' + sprint.number + ') ' + moment(sprint.dateStart, 'x').format('L') + ' - ' + moment(sprint.dateEnd, 'x').format('L');
                    } else {
                        $rootScope.titleMiddle = ' (' + sprint.number + ') ' + moment(sprint.dateStart).format('L') + ' - ' + moment(sprint.dateEnd).format('L');
                    }
                    //sprint.hoursMember = project.ti;
                }

                $rootScope.sprint = sprint;
                return sprint;
            },
            sprintNext: function () {
                var productId = this.getReactively('productId');
                var sprintId = this.getReactively('sprintId');
                sprint = Sprint.findOne({_id: sprintId});
                sprintNext = {};
                if (sprint) {
                    sprintNextNumber = sprint.number + 1;
                    sprintNext = Sprint.findOne({projectId: productId, number: sprintNextNumber});
                    if (sprintNext) {
                        if (typeof(sprintNext.dateStart) === 'string') {
                            sprintNext.dateStartTreated = moment(sprintNext.dateStart, 'x').format('L');
                            sprintNext.dateEndTreated = moment(sprintNext.dateEnd, 'x').format('L');
                            sprintNext.days = moment(sprintNext.dateEnd, 'x').diff(moment(sprintNext.dateStart, 'x'), 'days') + 1;
                        } else {
                            sprintNext.dateStartTreated = moment(sprintNext.dateStart).format('L');
                            sprintNext.dateEndTreated = moment(sprintNext.dateEnd).format('L');
                            sprintNext.days = moment(sprintNext.dateEnd).diff(moment(sprintNext.dateStart), 'days') + 1;
                        }
                        $rootScope.sprintNext = sprintNext;
                    }
                }

                if (!sprintNext) {
                    $rootScope.sprintNext = {};
                    Meteor.call('sprintFindNext', {
                        projectId: productId,
                        sprintId: sprintId
                    }, function (error, result) {
                        $rootScope.sprintNext = result;
                    });
                }

                if ($rootScope.sprintNext) {
                    project = Project.findOne(productId);
                    if (project && project.skipWeekend) {
                        if (typeof (sprintNext.dateStart) === 'string') {
                            $rootScope.sprintNext.daysBusiness = moment($rootScope.sprintNext.dateEnd, 'x').businessDiff(moment($rootScope.sprintNext.dateStart, 'x'), 'days');
                        } else {
                            $rootScope.sprintNext.daysBusiness = moment($rootScope.sprintNext.dateEnd).businessDiff(moment($rootScope.sprintNext.dateStart), 'days');
                        }
                        $rootScope.sprintNext.days = $rootScope.sprintNext.daysBusiness;
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
                    }

                    if (teams) {
                        timeTotal = 0;
                        teams.forEach(function (value) {
                            if (isInt(parseInt(value.timeTotal))) {
                                timeTotal = parseInt(value.timeTotal) + timeTotal;
                            }
                        });

                        $rootScope.sprintNext.timeTotal = timeTotal * $rootScope.sprintNext.days;
                    } else {
                        $rootScope.sprintNext.timeTotal = 0;
                    }

                    notes = Note.find({
                        $and: [{sprintId: $rootScope.sprintNext._id}],
                        $or: [{projectId: productId}, {projectId: null}]
                    }).fetch();
                    if (notes) {
                        timeTotal = 0;
                        notes.forEach(function (value) {
                            if (isInt(parseInt(value.time))) {
                                timeTotal = parseInt(value.time) + timeTotal;
                            }
                        });
                        $rootScope.sprintNext.timeTotalNotes = timeTotal;
                    } else {
                        $rootScope.sprintNext.timeTotalNotes = 0;
                    }

                    notesDone = Note.find({
                        $and: [{sprintId: $rootScope.sprintNext._id}, {statusId: '1'}],
                        $or: [{projectId: productId}, {projectId: null}]
                    }).fetch();
                    if (notesDone) {
                        timeTotal = 0;
                        notesDone.forEach(function (value) {
                            if (isInt(parseInt(value.time))) {
                                //timeTotal = parseInt(value.time) + timeTotal;
                            }
                        });
                        $rootScope.sprintNext.timeTotalNotesDone = timeTotal;
                    } else {
                        $rootScope.sprintNext.timeTotalNotesDone = 0;
                    }
                }

                return $rootScope.sprintNext;
            },
            sprintPrevious: function () {
                var productId = this.getReactively('productId');
                var sprintId = this.getReactively('sprintId');
                sprint = Sprint.findOne({_id: sprintId});
                sprintPrevious = {};
                if (sprint) {
                    sprint = Sprint.findOne({_id: sprintId});
                    sprintPrevious = {};
                    if (sprint) {
                        sprintPreviousNumber = sprint.number - 1;
                        sprintPrevious = Sprint.findOne({projectId: productId, number: sprintPreviousNumber});
                        if (sprintPrevious) {
                            if (typeof (sprintPrevious.dateStart) === 'string') {
                                sprintPrevious.dateStartTreated = moment(sprintPrevious.dateStart, 'x').format('L');
                                sprintPrevious.dateEndTreated = moment(sprintPrevious.dateEnd, 'x').format('L');
                            } else {
                                sprintPrevious.dateStartTreated = moment(sprintPrevious.dateStart).format('L');
                                sprintPrevious.dateEndTreated = moment(sprintPrevious.dateEnd).format('L');
                            }
                        }
                    }
                    $rootScope.sprintPrevious = sprintPrevious;
                }

                if ($rootScope.sprintPrevious) {

                    if (typeof ($rootScope.sprintPrevious.dateStart) === 'string') {
                        $rootScope.sprintPrevious.days = moment($rootScope.sprintPrevious.dateEnd, 'x').diff(moment($rootScope.sprintPrevious.dateStart, 'x'), 'days') + 1;
                    } else {
                        $rootScope.sprintPrevious.days = moment($rootScope.sprintPrevious.dateEnd).diff(moment($rootScope.sprintPrevious.dateStart), 'days') + 1;
                    }
                    project = Project.findOne(productId);
                    if (project && project.skipWeekend) {
                        if (typeof ($rootScope.sprintPrevious.dateStart) === 'string') {
                            $rootScope.sprintPrevious.daysBusiness = moment($rootScope.sprintPrevious.dateEnd, 'x').businessDiff(moment($rootScope.sprintPrevious.dateStart, 'x'), 'days');
                        } else {
                            $rootScope.sprintPrevious.daysBusiness = moment($rootScope.sprintPrevious.dateEnd).businessDiff(moment($rootScope.sprintPrevious.dateStart), 'days');
                        }
                        $rootScope.sprintPrevious.days = $rootScope.sprintPrevious.daysBusiness;
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
                    }

                    if (teams) {
                        timeTotal = 0;
                        teams.forEach(function (value) {
                            if (isInt(parseInt(value.timeTotal))) {
                                timeTotal = parseInt(value.timeTotal) + timeTotal;
                            }
                        });

                        $rootScope.sprintPrevious.timeTotal = parseInt(timeTotal * $rootScope.sprintPrevious.days);
                    } else {
                        $rootScope.sprintPrevious.timeTotal = 0;
                    }

                    notes = Note.find({
                        $and: [{sprintId: $rootScope.sprintPrevious._id}],
                        $or: [{projectId: productId}, {projectId: null}]
                    }).fetch();
                    if (notes) {
                        timeTotal = 0;
                        notes.forEach(function (value) {
                            if (isInt(parseInt(value.time))) {
                                timeTotal = parseInt(value.time) + timeTotal;
                            }
                        });
                        $rootScope.sprintPrevious.timeTotalNotes = parseInt(timeTotal);
                    } else {
                        $rootScope.sprintPrevious.timeTotalNotes = 0;
                    }

                    notesDone = Note.find({
                        $and: [{sprintId: $rootScope.sprintPrevious._id}, {statusId: '1'}],
                        $or: [{projectId: productId}, {projectId: null}]
                    }).fetch();
                    if (notesDone) {
                        timeTotal = 0;
                        notesDone.forEach(function (value) {
                            if (isInt(parseInt(value.time))) {
                                timeTotal = parseInt(value.time) + timeTotal;
                            }
                        });
                        $rootScope.sprintPrevious.timeTotalNotesDone = timeTotal;
                    } else {
                        $rootScope.sprintPrevious.timeTotalNotesDone = 0;
                    }
                }

                return $rootScope.sprintPrevious;
            }
        });
        $scope.modalStorySave = function (ev, id) {
            $mdDialog.show({
                controller: 'StorySaveCtrl',
                templateUrl: 'module/scrum/client/view/story-save.ng.html',
                clickOutsideToClose: true,
                locals: {id: id},
                targetEvent: ev
            });
        };
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
        $scope.modalNoteView = function (ev, id, storyId) {
            $mdDialog.show({
                controller: 'NoteViewCtrl',
                templateUrl: 'module/scrum/client/view/note-view.ng.html',
                clickOutsideToClose: true,
                targetEvent: ev,
                locals: {
                    id: id,
                    storyId: storyId
                }
            }).then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
        };

        this.noteTrash = function($id){
            Meteor.call('noteTrash', {id: $id, trash: true}, function (error) {
                if (error) {
                    Materialize.toast('Erro: ' + error, 4000);
                } else {
                    Materialize.toast('Deleted successfully!', 4000);
                }
            });
        };
}]);
