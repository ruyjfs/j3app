angular.module('scrum').controller('BurndownCtrl',
    function ($scope, $stateParams, $reactive) {
        $reactive(this).attach($scope);

        sprint = {};

        $scope.progressBar = {};
        $scope.progressBar.users = Meteor.subscribe('users').ready();
        this.subscribe('users', () => {}, {onReady: () => {$scope.progressBar.users = true;}});
        $scope.progressBar.organization = Meteor.subscribe('organization').ready();
        this.subscribe('organization', () => {}, {onReady: () => {$scope.progressBar.organization = true;}});
        $scope.progressBar.project = Meteor.subscribe('project').ready();
        this.subscribe('project', () => {}, {onReady: () => {$scope.progressBar.project = true;}});
        $scope.progressBar.team = Meteor.subscribe('team', $stateParams.organization).ready();
        this.subscribe('team', () => {return [$stateParams.organization]}, {onReady: () => {$scope.progressBar.team = true;}});
        $scope.progressBar.sprint = Meteor.subscribe('team', $stateParams.organization).ready();
        this.subscribe('sprint', () => {return [$stateParams.organization]}, {onReady: () => {$scope.progressBar.sprint = true;}});
        $scope.progressBar.burndown = Meteor.subscribe('burndown', $stateParams.organization).ready();
        this.subscribe('burndown', function(){return [$stateParams.product]}, {onReady: () => {$scope.progressBar.burndown = true;}});
        $scope.progressBar.status = Meteor.subscribe('status', $stateParams.product).ready();
        this.subscribe('status', function(){return [$stateParams.product]}, {onReady: () => {$scope.progressBar.status = true;}});
        $scope.progressBar.note = Meteor.subscribe('note', $stateParams.product).ready();
        this.subscribe('note', function(){return [$stateParams.product, {}, this.getReactively('searchText')]}, {onReady: () => {$scope.progressBar.note = true;}});
        $scope.progressBar.story = Meteor.subscribe('story', $stateParams.product).ready();
        this.subscribe('story', function(){return [$stateParams.product]}, {onReady: () => {$scope.progressBar.story = true;}});
        $scope.progressBar.sprint = Meteor.subscribe('sprint', $stateParams.product).ready();
        this.subscribe('sprint', function(){return [$stateParams.product]}, {onReady: () => {$scope.progressBar.sprint = true;}});
        $scope.booLoading = true;
        $scope.$watchCollection('progressBar', function() {
            if (
                $scope.progressBar.users,
                    $scope.progressBar.organization,
                    $scope.progressBar.project,
                    $scope.progressBar.team,
                    $scope.progressBar.burndown,
                    $scope.progressBar.status,
                    $scope.progressBar.note,
                    $scope.progressBar.story,
                    $scope.progressBar.sprint
            ) {
                // let organisations = Organization.find({}, {sort: {name: 1}}).map((organization) => {return organization});
                // if (organisations.length == 0) {
                //     if (Session.get('booMsgOrganization') != true) {
                //         Materialize.toast(
                //             $translate.instant('Hi, my name is Ryu, i will help you with whatever it takes.')
                //             , 120000);
                //         Materialize.toast(
                //             $translate.instant('You have no organization, click the red button to create an organization, or contact the owner of an organization to add you to their organization.')
                //             , 120000);
                //         Materialize.toast(
                //             $translate.instant('You can create products without organization, just enter the card without organization. For more information, click on the question mark icon in the top menu.')
                //             , 120000);
                //         Materialize.toast(
                //             $translate.instant('If you have any questions or suggestions, please contact us at contact@j3scrum.com.')
                //             , 120000);
                //         Materialize.toast(
                //             $translate.instant('To close these messages, drag to the side.')
                //             , 120000);
                //         Materialize.toast(
                //             $translate.instant("I'm so glad you joined j3scrum, many things are still to come, best regards!!!")
                //             , 120000);
                //         Session.set('booMsgOrganization', true);
                //     }
                //     $document.ready(() => {
                //         $('.md-fab').addClass('pulse');
                //         console.log($('.md-fab'));
                //     });
                // }
                $scope.booLoading = false;
                $('#progressBar').fadeOut('slow');
            }
        });
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
            sprint: function () {
                var productId = this.getReactively('productId');
                var sprintId = this.getReactively('sprintId');
                project = Project.findOne(productId);
                sprint = Sprint.findOne({_id: sprintId});
                tasks = ['1'];
                daysCorrect = ['1'];
                if (sprint) {

                    // Tratando as datas.
                    if (typeof(sprint.dateStart) === 'string') {
                        sprint.dateStartTreated = moment(sprint.dateStart, 'x').format('DD/MM dd');
                        sprint.dateEndTreated = moment(sprint.dateEnd, 'x').format('DD/MM dd');
                        sprint.daysTotal = moment(sprint.dateEnd, 'x').diff(moment(sprint.dateStart, 'x'), 'days');
                    } else {
                        sprint.dateStartTreated = moment(sprint.dateStart).format('DD/MM dd');
                        sprint.dateEndTreated = moment(sprint.dateEnd).format('DD/MM dd');
                        sprint.daysTotal = moment(sprint.dateEnd).diff(moment(sprint.dateStart), 'days');
                    }

                    // Calculando quantidade de pessoas em cada time.
                    // Calculando o tempo total conforme a quantidade de pessoas no time.
                    if (project.teams) {
                        teams = Team.find({_id: {$in: project.teams}}).fetch().map(function (team) {
                            if (team.members) {
                                team.members = Meteor.users.find({_id: {$in: team.members}}).fetch();
                                team.membersTotal = team.members.length;
                                team.timeTotal = team.membersTotal * team.time;
                            }
                            return team;
                        });
                    }

                    // Calculando o total de tempo de todos os times juntos.
                    timeTotal = 0;
                    if (teams) {
                        teams.forEach(function (value) {
                            if (isInt(parseInt(value.timeTotal))) {
                                timeTotal = parseInt(value.timeTotal) + timeTotal;
                            }
                        });

                        sprint.timeTotal = timeTotal * sprint.days;
                    } else {
                        sprint.timeTotal = 0;
                    }
                    timeTotalTeams = timeTotal;

                    notes = Note.find({
                        $and: [{sprintId: sprintId}],
                        $or: [{projectId: productId}, {projectId: null}]
                    }).fetch();

                    // Calculando a quantidade de tempo das tarefas.
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

                    // Calculando aquantidade de tarefas prontas.
                    notesDone = Note.find({
                        $and: [{sprintId: sprintId}, {statusId: '1'}],
                        $or: [{projectId: productId}, {projectId: null}]
                    }).fetch();
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
                    //
                    //sprint.progressDone = sprint.timeTotalNotesDone * 100 / sprint.timeTotal;
                    //sprint.progress = sprint.timeTotalNotes * 100 / sprint.timeTotal;

                    //console.log(sprint.timeTotalNotes);
                    //console.log(sprint.timeTotalNotesDone);


                    sprint.days = [sprint.dateStartTreated];
                    tasks = [sprint.timeTotalNotes];
                    daysCorrect = [sprint.timeTotalNotes];
                    timeTotalNotes = sprint.timeTotalNotes;
                    booTimeTotalNotes = true;
                    //timeTotalTeams = timeTotalTeams
                    sprint.daysTotal = sprint.daysTotal + 1;
                    //console.log(sprint.daysTotal);
                    burndown = [];
                    timeTotalNotesDone = [sprint.timeTotalNotes];
                    if (sprint) {
                        burndown = Burndown.find({
                            sprintId: sprint._id,
                            'date': {
                                $gte: sprint.dateStart,
                                $lte: sprint.dateEnd
                            }
                        }).fetch();
                    }
                    sprint.date = [];
                    timeTotalNotesDoneLast = sprint.timeTotalNotes;
                    for ($i = 1; $i <= sprint.daysTotal; $i++) {
                        // Adicionando dia a data conforme a quantidade de dias e loop.
                        if (typeof(sprint.dateStart) === 'string') {
                            date = moment(sprint.dateStart, 'x').add($i, 'days');
                            sprint.days[$i] = moment(sprint.dateStart, 'x').add($i, 'days').format('DD/MM dd');
                            sprint.date[$i] = moment(sprint.dateStart, 'x').add($i, 'days').format('YYYY-MM-DD');
                        } else {
                            date = moment(sprint.dateStart).add($i, 'days');
                            sprint.days[$i] = moment(sprint.dateStart).add($i, 'days').format('DD/MM dd');
                            sprint.date[$i] = moment(sprint.dateStart).add($i, 'days').format('YYYY-MM-DD');
                        }

                        if (sprint.date[$i] <= moment().format('YYYY-MM-DD')) {
                            burndown.forEach(function(value){
                                if (moment(value.date).format('YYYY-MM-DD') == sprint.date[$i]) {
                                    timeTotalNotesDone[$i+1] = value.timeTotalNotes - value.timeTotalNotesDone;
                                    timeTotalNotesDoneLast = timeTotalNotesDone[$i+1];
                                } else {
                                    timeTotalNotesDone[$i+1] = timeTotalNotesDoneLast;
                                }
                            });
                            //console.log(sprint.date[$i]);
                        }

                        // Se for final de semana nao disconta os dias.
                        if (project.skipWeekend && (date.isoWeekday() == 1 || date.isoWeekday() == 7)) {
                            //timeTotalNotes = timeTotalNotes + timeTotalTeams;
                            //console.log('FINAL DE SEMANA - BEGINING');
                            //console.log(date.isoWeekday());
                            //console.log(date);
                            //console.log(sprint.days[$i]);
                            //console.log($i);
                            //console.log(moment(sprint.dateStart, 'x').add($i, 'days').format('DD/MM dd'));
                            //console.log(moment(sprint.dateStart, 'x').add($i, 'days').format('DD/MM dd'));
                            //console.log(moment(sprint.dateStart, 'x').add($i, 'days').isoWeekday());
                            //console.log(moment(sprint.dateStart, 'x').add($i, 'days').isoWeekday());
                            //console.log(project.skipWeekend);
                            //console.log('FINAL DE SEMANA END');
                        } else {
                            timeTotalNotes = timeTotalNotes - timeTotalTeams;
                        }

                        // Adicionando o tempo total que resta.
                        if (timeTotalNotes > 0) {
                            daysCorrect[$i] = timeTotalNotes;
                        } else if(booTimeTotalNotes) {
                            daysCorrect[$i] = 0;
                            booTimeTotalNotes = false;
                        }

                        //console.log(sprint.days[$i]);
                        //console.log(daysCorrect[$i]);

                        //tasks[$i] = sprint.daysTotal - $i;
                    }
                    //console.log(daysCorrect);
                    //
                    //console.log(sprint.days);

                    //if (project.skipWeekend) {
                    //    if (typeof(sprint.dateStart) === 'string') {
                    //        sprint.daysBusiness = moment(sprint.dateEnd, 'x').businessDiff(moment(sprint.dateStart, 'x'), 'days') + 1;
                    //    } else {
                    //        sprint.daysBusiness = moment(sprint.dateEnd).businessDiff(moment(sprint.dateStart), 'days') + 1;
                    //    }
                    //    sprint.days = sprint.daysBusiness;
                    //}
                    //
                }


                //{dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}

                if (sprint) {
                    labels = sprint.days;
                } else {
                    labels = ['1'];
                    timeTotalNotesDone = ['1'];
                }

                //timeTotalNotesDone = [];
                //console.log(labels);
                //console.log(sprint);
                //console.log(daysCorrect);
                //console.log(burndown);
                //console.log(timeTotalNotesDone);
                //console.log(tasks);
                var chart = new Chartist.Line('.ct-chart', {
                    labels: labels,
                    series: [
                        daysCorrect,
                        //tasks,
                        //[0],
                        timeTotalNotesDone
                        //[200,  150, 130, 100, 7, 8, 6, 4, 2, 4,  3, 1, 0],
                        //[12,  12, 11, 8, 7, 8, 6, 4, 2, 4,  3, 1, 0],
                        //[12,  10, 9, 10, 11, 5, 6, 7, 3, 2,  4, 1, 0],
                    ],
//                onlyInteger: true,
                }, {
                    low: 0,
                    onlyInteger: true,
                    showArea: true,
//                lineSmooth: Chartist.Interpolation.none({
//                    fillHoles: true
//                })
                });

                // Let's put a sequence number aside so we can use it in the event callbacks
                var seq = 0,
                    delays = 80,
                    durations = 60;

                // Once the chart is fully created we reset the sequence
                chart.on('created', function () {
                    seq = 0;
                });

                // On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
                chart.on('draw', function (data) {
                    seq++;

                    if (data.type === 'line') {
                        // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
                        data.element.animate({
                            opacity: {
                                // The delay when we like to start the animation
                                begin: seq * delays + 1000,
                                // Duration of the animation
                                dur: durations,
                                // The value where the animation should start
                                from: 0,
                                // The value where it should end
                                to: 1
                            }
                        });
                    } else if (data.type === 'label' && data.axis === 'x') {
                        data.element.animate({
                            y: {
                                begin: seq * delays,
                                dur: durations,
                                from: data.y + 100,
                                to: data.y,
                                // We can specify an easing function from Chartist.Svg.Easing
                                easing: 'easeOutQuart'
                            }
                        });
                    } else if (data.type === 'label' && data.axis === 'y') {
                        data.element.animate({
                            x: {
                                begin: seq * delays,
                                dur: durations,
                                from: data.x - 100,
                                to: data.x,
                                easing: 'easeOutQuart'
                            }
                        });
                    } else if (data.type === 'point') {
                        data.element.animate({
                            x1: {
                                begin: seq * delays,
                                dur: durations,
                                from: data.x - 10,
                                to: data.x,
                                easing: 'easeOutQuart'
                            },
                            x2: {
                                begin: seq * delays,
                                dur: durations,
                                from: data.x - 10,
                                to: data.x,
                                easing: 'easeOutQuart'
                            },
                            opacity: {
                                begin: seq * delays,
                                dur: durations,
                                from: 0,
                                to: 1,
                                easing: 'easeOutQuart'
                            }
                        });
                    } else if (data.type === 'grid') {
                        // Using data.axis we get x or y which we can use to construct our animation definition objects
                        var pos1Animation = {
                            begin: seq * delays,
                            dur: durations,
                            from: data[data.axis.units.pos + '1'] - 30,
                            to: data[data.axis.units.pos + '1'],
                            easing: 'easeOutQuart'
                        };

                        var pos2Animation = {
                            begin: seq * delays,
                            dur: durations,
                            from: data[data.axis.units.pos + '2'] - 100,
                            to: data[data.axis.units.pos + '2'],
                            easing: 'easeOutQuart'
                        };

                        var animations = {};
                        animations[data.axis.units.pos + '1'] = pos1Animation;
                        animations[data.axis.units.pos + '2'] = pos2Animation;
                        animations['opacity'] = {
                            begin: seq * delays,
                            dur: durations,
                            from: 0,
                            to: 1,
                            easing: 'easeOutQuart'
                        };

                        data.element.animate(animations);
                    }
                });

                return sprint;
            }
        });
    }
);