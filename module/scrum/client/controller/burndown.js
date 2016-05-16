//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('BurndownCtrl', ['$scope', '$stateParams', '$reactive',
    function ($scope, $stateParams, $reactive) {
        $reactive(this).attach($scope);

        sprint = {};
        this.subscribe('users');
        this.subscribe('message');
        this.subscribe('project');
        this.subscribe('team');
        this.subscribe('status', function(){return [$stateParams.id]});
        this.subscribe('note', function(){return [$stateParams.id]});
        this.subscribe('story', function(){return [$stateParams.id]});
        this.subscribe('sprint', function(){return [$stateParams.id]});
        this.helpers({
            sprint: function () {
                project = Project.findOne($stateParams.id);
                sprint = Sprint.findOne({_id: $stateParams.sprintId});

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
                        $and: [{sprintId: $stateParams.sprintId}],
                        $or: [{projectId: $stateParams.id}, {projectId: null}]
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
                        $and: [{sprintId: $stateParams.sprintId}, {statusId: '1'}],
                        $or: [{projectId: $stateParams.id}, {projectId: null}]
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

                    //console.log(sprint.daysTotal);
                    for ($i = 1; $i <= sprint.daysTotal; $i++) {
                        // Adicionando dia a data conforme a quantidade de dias e loop.
                        if (typeof(sprint.dateStart) === 'string') {
                            sprint.days[$i] = moment(sprint.dateStart, 'x').add($i, 'days').format('DD/MM dd');
                        } else {
                            sprint.days[$i] = moment(sprint.dateStart).add($i, 'days').format('DD/MM dd');
                        }

                        // Se for final de semana nao disconta os dias.
                        if (project.skipWeekend && (moment(sprint.dateStart, 'x').add($i, 'days').isoWeekday() == 2+1 || moment(sprint.dateStart, 'x').add($i, 'days').isoWeekday() == 3+1)) {
                            //timeTotalNotes = timeTotalNotes + timeTotalTeams;
                            console.log('FINAL DE SEMANA - BEGINING');
                            console.log(sprint.days[$i]);
                            console.log('FINAL DE SEMANA END');
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

                if (sprint) {
                    labels = sprint.days;
                } else {
                    labels = ['1'];
                }

                console.log(labels);
                console.log(daysCorrect);
                console.log(tasks);
                var chart = new Chartist.Line('.ct-chart', {
                    labels: labels,
                    series: [
                        daysCorrect,
                        tasks,
//                    [12,  12, 11, 8, 7, 8, 6, 4, 2, 4,  3, 1, 0],
//                    [12,  10, 9, 10, 11, 5, 6, 7, 3, 2,  4, 1, 0],
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
                    durations = 500;

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
]);