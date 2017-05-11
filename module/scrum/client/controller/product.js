angular.module('scrum').controller('ProductCtrl',
    function ($scope, $mdDialog, $mdSidenav, $log, $reactive, $rootScope, $stateParams, $translate, $document) {
        $reactive(this).attach($scope);
        $translate.use(Session.get('lang'));
        $rootScope.titleMiddle = '';

        //Materialize.toast(
        //    'Hello, this screen you can view the products you created and the products that you participate, either in you being on the team linked to the project or standing as PO or Scrum Master.'+
        //    20000
        //);
        //Materialize.toast(
        //    'You can only edit projects that you are the owner.' +
        //    'In all screens with the most (+) button you can add something, then add a team to the project elogo then the product linking the team in the registration of the product.',
        //    20000
        //);
        $scope.progressBar = {};
        // $scope.progressBar.organization = Meteor.subscribe('organization').ready();
        this.subscribe('organization', () => {}, {onReady: () => {$scope.progressBar.organization = true;}});
        $scope.progressBar.project = Meteor.subscribe('project').ready();
        this.subscribe('project', () => {}, {onReady: function () {$scope.progressBar.project = true;}});
        $scope.progressBar.users = Meteor.subscribe('users').ready();
        this.subscribe('users', () => {}, {onReady: function () {$scope.progressBar.users = true;}});
        $scope.progressBar.team = Meteor.subscribe('team', $stateParams.organization).ready();
        this.subscribe('team', () => {return [$stateParams.organization]}, {onReady: function () {$scope.progressBar.team = true;}});
        $scope.progressBar.sprint = Meteor.subscribe('sprint', $stateParams.organization).ready();
        this.subscribe('sprint', () => {return [$stateParams.organization]}, {onReady: function () {$scope.progressBar.sprint = true;}});
        $scope.booLoading = true;
        $scope.$watchCollection('progressBar', function() {
            if (
                    $scope.progressBar.organization,
                    $scope.progressBar.project,
                    $scope.progressBar.users,
                    $scope.progressBar.sprint,
                    $scope.progressBar.team
            ) {
                let arrProject = Project.find({}, {sort: {name: 1}}).fetch();
                if (arrProject.length == 0) {
                    if (Session.get('booMsgProduct') != true) {
                        Materialize.toast(
                            $translate.instant('This is where the products of the organization are.')
                            , 140000);
                        Materialize.toast(
                            $translate.instant('In scrum we call any type of project in a product.')
                            , 140000);
                        Materialize.toast(
                            $translate.instant("Following the hierarchical order in j3scrum, an organization owns the products, a product has several sprints and each sprint have several tasks.")
                            , 140000);
                        Materialize.toast(
                            $translate.instant("Relax, when entering the product you will know better how the scrum works and the main one as it is a kanban.")
                            , 140000);
                        Materialize.toast(
                            $translate.instant("Click the red button to create a product.")
                            , 140000);
                        Materialize.toast(
                            $translate.instant("Do not forget, every screen has the question button in the upper corner to better explain the scrum and the functionality of each screen.")
                            , 140000);
                        Materialize.toast(
                            $translate.instant("Good luck with the product!!!")
                            , 140000);
                        Session.set('booMsgProduct', true);
                    }
                    $document.ready(() => {
                        $('.md-fab').addClass('pulse');
                        console.log($('.md-fab'));
                    });
                }
                $scope.booLoading = false;
                $('#progressBar').fadeOut('slow');
            }
        });

        this.helpers({
            projects: function () {
                let organizationId = '';
                if ($stateParams.organization == 'organization') {
                    projects = Project.find({$or: [{organization: ''}, {organization: null}]}, {sort: {name: 1}});
                } else {
                    organization = Organization.findOne({namespace: $stateParams.organization});
                    if (organization) {
                        organizationId = organization._id;
                    }
                    projects = Project.find({organization: organizationId}, {sort: {name: 1}});
                }

                projects = projects.map(function (project) {
                    if (!project.namespace || $stateParams.organization == 'organization') {
                        project.namespace = project._id;
                    }

                    //projects = Project.find({$or: [{userId: Meteor.userId()}, {teams: {$in: teamsId}}, {scrumMaster: {$in: [Meteor.userId()]}}]}).map(function(project){
                    if (project.teams) {
                        project.teams = Team.find({
                            _id: {$in: project.teams},
                            $or: [{'members': Meteor.userId(), userId: Meteor.userId()}]
                        }).fetch();
                    }
                    project.owner = Meteor.users.findOne(project.userId);
                    dateNow = moment().format('x');
                    sprint = Sprint.findOne(
                        {
                            $and: [
                                {projectId: project._id},
                                {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
                            ]
                        }
                    );

                    if (!sprint) {
                        dateNow = moment()._d;
                        sprint = Sprint.findOne(
                            {
                                $and: [
                                    {projectId: project._id},
                                    {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
                                ]
                            }
                        );
                    }

                    if (!sprint) {
                        Meteor.call('sprintCreate', project._id, function (error, result) {
                            if (error) {
                                //console.log(error);
                            } else {
                                //console.log('Saved!');
                                $scope.form = '';
                                $mdDialog.hide();
                            }
                            //$rootScope.titleMiddle = result.dateStart + ' - ' + result.dateEnd + ' (' + result.number + ')';

                            sprint = result;
                            //console.info(result);
                        });
                    }

                    //if (sprint) {
                    project.sprint = sprint;
                    //} else {
                    //    Meteor.call('sprintCreate', project._id, function (error, result) {
                    //        if (error) {
                    //            console.log(error);
                    //        } else {
                    //            //console.log('Saved!');
                    //            //$scope.form = '';
                    //            //$mdDialog.hide();
                    //            project.sprint = result;
                    //        }
                    //    });
                    //}
                    if (project.organization) {
                        project.organizationNamespace = organization.namespace;
                    } else {
                        project.organizationNamespace = 'organization';
                    }

                    return project;
                });

                return projects;
            }
        }, true);

        this.items = [
            {name: "Project", icon: "business_center", direction: "left", color: 'red'},
            {name: "Team", icon: "group_work", direction: "top", color: 'blue'}
        ];

        this.isOwner = function (userId) {
            if (userId) {
                return (Meteor.userId() == userId);
            } else {
                return true;
            }
        };

        this.remove = function (id) {
            this.projects.remove(id);
        };

        this.modalProjectSave = function (ev, id) {
            $mdDialog.show({
                controller: 'ProjectSaveCtrl as ctrl',
                templateUrl: 'module/scrum/client/view/project-save.ng.html',
                clickOutsideToClose: true,
                locals: {
                    id: id
                },
                targetEvent: ev
            }).then(function (answer) {
                this.status = 'You said the information was "' + answer + '".';
            }, function () {
                this.status = 'You cancelled the dialog.';
            });
        };


        $document.ready(() => {
            // var gauge1 = loadLiquidFillGauge("fillgauge1", 55);
            var config1 = liquidFillGaugeDefaultSettings();
            config1.circleColor = "#4e342e";
            config1.circleColor = "#ef6c00";
            config1.textColor = "#ef6c00";
            config1.waveTextColor = "#ef6c00";
            config1.waveColor = "#ffb74d";
            config1.circleThickness = 0.2;
            // config1.textVertPosition = 0.2;
            config1.waveAnimateTime = 1000;
            var gauge2 = loadLiquidFillGauge("fillgauge1", 45, config1);
            var config2 = liquidFillGaugeDefaultSettings();
            // config1.circleColor = "#4e342e";
            // config1.circleColor = "#ef6c00";
            // config1.textColor = "#ef6c00";
            config2.waveTextColor = "rgb(0, 101, 183)";
            config2.waveColor = "rgb(64, 178, 255)";
            config2.circleThickness = 0.2;
            config2.waveAnimateTime = 1000;
            var gauge3 = loadLiquidFillGauge("fillgauge2", 45, config2);

            function NewValue(){
                if(Math.random() > .5){
                    return Math.round(Math.random()*100);
                } else {
                    return (Math.random()*100).toFixed(1);
                }
            }

        });


        angular.element(document).ready(function () {

            let objJson = {
                "name": "flare",
                "children": [
                    {
                        "name": "analytics",
                        "children": [
                            {
                                "name": "cluster",
                                "children": [
                                    {"name": "AgglomerativeCluster", "size": 3938},
                                    {"name": "CommunityStructure", "size": 3812},
                                    {"name": "HierarchicalCluster", "size": 6714},
                                    {"name": "MergeEdge", "size": 743}
                                ]
                            },
                            {
                                "name": "graph",
                                "children": [
                                    {"name": "BetweennessCentrality", "size": 3534},
                                    {"name": "LinkDistance", "size": 5731},
                                    {"name": "MaxFlowMinCut", "size": 7840},
                                    {"name": "ShortestPaths", "size": 5914},
                                    {"name": "SpanningTree", "size": 3416}
                                ]
                            },
                            {
                                "name": "optimization",
                                "children": [
                                    {"name": "AspectRatioBanker", "size": 7074}
                                ]
                            }
                        ]
                    },
                    {
                        "name": "animate",
                        "children": [
                            {"name": "Easing", "size": 17010},
                            {"name": "FunctionSequence", "size": 5842},
                            {
                                "name": "interpolate",
                                "children": [
                                    {"name": "ArrayInterpolator", "size": 1983},
                                    {"name": "ColorInterpolator", "size": 2047},
                                    {"name": "DateInterpolator", "size": 1375},
                                    {"name": "Interpolator", "size": 8746},
                                    {"name": "MatrixInterpolator", "size": 2202},
                                    {"name": "NumberInterpolator", "size": 1382},
                                    {"name": "ObjectInterpolator", "size": 1629},
                                    {"name": "PointInterpolator", "size": 1675},
                                    {"name": "RectangleInterpolator", "size": 2042}
                                ]
                            },
                            {"name": "ISchedulable", "size": 1041},
                            {"name": "Parallel", "size": 5176},
                            {"name": "Pause", "size": 449},
                            {"name": "Scheduler", "size": 5593},
                            {"name": "Sequence", "size": 5534},
                            {"name": "Transition", "size": 9201},
                            {"name": "Transitioner", "size": 19975},
                            {"name": "TransitionEvent", "size": 1116},
                            {"name": "Tween", "size": 6006}
                        ]
                    },
                    {
                        "name": "data",
                        "children": [
                            {
                                "name": "converters",
                                "children": [
                                    {"name": "Converters", "size": 721},
                                    {"name": "DelimitedTextConverter", "size": 4294},
                                    {"name": "GraphMLConverter", "size": 9800},
                                    {"name": "IDataConverter", "size": 1314},
                                    {"name": "JSONConverter", "size": 2220}
                                ]
                            },
                            {"name": "DataField", "size": 1759},
                            {"name": "DataSchema", "size": 2165},
                            {"name": "DataSet", "size": 586},
                            {"name": "DataSource", "size": 3331},
                            {"name": "DataTable", "size": 772},
                            {"name": "DataUtil", "size": 3322}
                        ]
                    },
                    {
                        "name": "display",
                        "children": [
                            {"name": "DirtySprite", "size": 8833},
                            {"name": "LineSprite", "size": 1732},
                            {"name": "RectSprite", "size": 3623},
                            {"name": "TextSprite", "size": 10066}
                        ]
                    },
                    {
                        "name": "flex",
                        "children": [
                            {"name": "FlareVis", "size": 4116}
                        ]
                    },
                    {
                        "name": "physics",
                        "children": [
                            {"name": "DragForce", "size": 1082},
                            {"name": "GravityForce", "size": 1336},
                            {"name": "IForce", "size": 319},
                            {"name": "NBodyForce", "size": 10498},
                            {"name": "Particle", "size": 2822},
                            {"name": "Simulation", "size": 9983},
                            {"name": "Spring", "size": 2213},
                            {"name": "SpringForce", "size": 1681}
                        ]
                    },
                    {
                        "name": "query",
                        "children": [
                            {"name": "AggregateExpression", "size": 1616},
                            {"name": "And", "size": 1027},
                            {"name": "Arithmetic", "size": 3891},
                            {"name": "Average", "size": 891},
                            {"name": "BinaryExpression", "size": 2893},
                            {"name": "Comparison", "size": 5103},
                            {"name": "CompositeExpression", "size": 3677},
                            {"name": "Count", "size": 781},
                            {"name": "DateUtil", "size": 4141},
                            {"name": "Distinct", "size": 933},
                            {"name": "Expression", "size": 5130},
                            {"name": "ExpressionIterator", "size": 3617},
                            {"name": "Fn", "size": 3240},
                            {"name": "If", "size": 2732},
                            {"name": "IsA", "size": 2039},
                            {"name": "Literal", "size": 1214},
                            {"name": "Match", "size": 3748},
                            {"name": "Maximum", "size": 843},
                            {
                                "name": "methods",
                                "children": [
                                    {"name": "add", "size": 593},
                                    {"name": "and", "size": 330},
                                    {"name": "average", "size": 287},
                                    {"name": "count", "size": 277},
                                    {"name": "distinct", "size": 292},
                                    {"name": "div", "size": 595},
                                    {"name": "eq", "size": 594},
                                    {"name": "fn", "size": 460},
                                    {"name": "gt", "size": 603},
                                    {"name": "gte", "size": 625},
                                    {"name": "iff", "size": 748},
                                    {"name": "isa", "size": 461},
                                    {"name": "lt", "size": 597},
                                    {"name": "lte", "size": 619},
                                    {"name": "max", "size": 283},
                                    {"name": "min", "size": 283},
                                    {"name": "mod", "size": 591},
                                    {"name": "mul", "size": 603},
                                    {"name": "neq", "size": 599},
                                    {"name": "not", "size": 386},
                                    {"name": "or", "size": 323},
                                    {"name": "orderby", "size": 307},
                                    {"name": "range", "size": 772},
                                    {"name": "select", "size": 296},
                                    {"name": "stddev", "size": 363},
                                    {"name": "sub", "size": 600},
                                    {"name": "sum", "size": 280},
                                    {"name": "update", "size": 307},
                                    {"name": "variance", "size": 335},
                                    {"name": "where", "size": 299},
                                    {"name": "xor", "size": 354},
                                    {"name": "_", "size": 264}
                                ]
                            },
                            {"name": "Minimum", "size": 843},
                            {"name": "Not", "size": 1554},
                            {"name": "Or", "size": 970},
                            {"name": "Query", "size": 13896},
                            {"name": "Range", "size": 1594},
                            {"name": "StringUtil", "size": 4130},
                            {"name": "Sum", "size": 791},
                            {"name": "Variable", "size": 1124},
                            {"name": "Variance", "size": 1876},
                            {"name": "Xor", "size": 1101}
                        ]
                    },
                    {
                        "name": "scale",
                        "children": [
                            {"name": "IScaleMap", "size": 2105},
                            {"name": "LinearScale", "size": 1316},
                            {"name": "LogScale", "size": 3151},
                            {"name": "OrdinalScale", "size": 3770},
                            {"name": "QuantileScale", "size": 2435},
                            {"name": "QuantitativeScale", "size": 4839},
                            {"name": "RootScale", "size": 1756},
                            {"name": "Scale", "size": 4268},
                            {"name": "ScaleType", "size": 1821},
                            {"name": "TimeScale", "size": 5833}
                        ]
                    },
                    {
                        "name": "util",
                        "children": [
                            {"name": "Arrays", "size": 8258},
                            {"name": "Colors", "size": 10001},
                            {"name": "Dates", "size": 8217},
                            {"name": "Displays", "size": 12555},
                            {"name": "Filter", "size": 2324},
                            {"name": "Geometry", "size": 10993},
                            {
                                "name": "heap",
                                "children": [
                                    {"name": "FibonacciHeap", "size": 9354},
                                    {"name": "HeapNode", "size": 1233}
                                ]
                            },
                            {"name": "IEvaluable", "size": 335},
                            {"name": "IPredicate", "size": 383},
                            {"name": "IValueProxy", "size": 874},
                            {
                                "name": "math",
                                "children": [
                                    {"name": "DenseMatrix", "size": 3165},
                                    {"name": "IMatrix", "size": 2815},
                                    {"name": "SparseMatrix", "size": 3366}
                                ]
                            },
                            {"name": "Maths", "size": 17705},
                            {"name": "Orientation", "size": 1486},
                            {
                                "name": "palette",
                                "children": [
                                    {"name": "ColorPalette", "size": 6367},
                                    {"name": "Palette", "size": 1229},
                                    {"name": "ShapePalette", "size": 2059},
                                    {"name": "SizePalette", "size": 2291}
                                ]
                            },
                            {"name": "Property", "size": 5559},
                            {"name": "Shapes", "size": 19118},
                            {"name": "Sort", "size": 6887},
                            {"name": "Stats", "size": 6557},
                            {"name": "Strings", "size": 22026}
                        ]
                    },
                    {
                        "name": "vis",
                        "children": [
                            {
                                "name": "axis",
                                "children": [
                                    {"name": "Axes", "size": 1302},
                                    {"name": "Axis", "size": 24593},
                                    {"name": "AxisGridLine", "size": 652},
                                    {"name": "AxisLabel", "size": 636},
                                    {"name": "CartesianAxes", "size": 6703}
                                ]
                            },
                            {
                                "name": "controls",
                                "children": [
                                    {"name": "AnchorControl", "size": 2138},
                                    {"name": "ClickControl", "size": 3824},
                                    {"name": "Control", "size": 1353},
                                    {"name": "ControlList", "size": 4665},
                                    {"name": "DragControl", "size": 2649},
                                    {"name": "ExpandControl", "size": 2832},
                                    {"name": "HoverControl", "size": 4896},
                                    {"name": "IControl", "size": 763},
                                    {"name": "PanZoomControl", "size": 5222},
                                    {"name": "SelectionControl", "size": 7862},
                                    {"name": "TooltipControl", "size": 8435}
                                ]
                            },
                            {
                                "name": "data",
                                "children": [
                                    {"name": "Data", "size": 20544},
                                    {"name": "DataList", "size": 19788},
                                    {"name": "DataSprite", "size": 10349},
                                    {"name": "EdgeSprite", "size": 3301},
                                    {"name": "NodeSprite", "size": 19382},
                                    {
                                        "name": "render",
                                        "children": [
                                            {"name": "ArrowType", "size": 698},
                                            {"name": "EdgeRenderer", "size": 5569},
                                            {"name": "IRenderer", "size": 353},
                                            {"name": "ShapeRenderer", "size": 2247}
                                        ]
                                    },
                                    {"name": "ScaleBinding", "size": 11275},
                                    {"name": "Tree", "size": 7147},
                                    {"name": "TreeBuilder", "size": 9930}
                                ]
                            },
                            {
                                "name": "events",
                                "children": [
                                    {"name": "DataEvent", "size": 2313},
                                    {"name": "SelectionEvent", "size": 1880},
                                    {"name": "TooltipEvent", "size": 1701},
                                    {"name": "VisualizationEvent", "size": 1117}
                                ]
                            },
                            {
                                "name": "legend",
                                "children": [
                                    {"name": "Legend", "size": 20859},
                                    {"name": "LegendItem", "size": 4614},
                                    {"name": "LegendRange", "size": 10530}
                                ]
                            },
                            {
                                "name": "operator",
                                "children": [
                                    {
                                        "name": "distortion",
                                        "children": [
                                            {"name": "BifocalDistortion", "size": 4461},
                                            {"name": "Distortion", "size": 6314},
                                            {"name": "FisheyeDistortion", "size": 3444}
                                        ]
                                    },
                                    {
                                        "name": "encoder",
                                        "children": [
                                            {"name": "ColorEncoder", "size": 3179},
                                            {"name": "Encoder", "size": 4060},
                                            {"name": "PropertyEncoder", "size": 4138},
                                            {"name": "ShapeEncoder", "size": 1690},
                                            {"name": "SizeEncoder", "size": 1830}
                                        ]
                                    },
                                    {
                                        "name": "filter",
                                        "children": [
                                            {"name": "FisheyeTreeFilter", "size": 5219},
                                            {"name": "GraphDistanceFilter", "size": 3165},
                                            {"name": "VisibilityFilter", "size": 3509}
                                        ]
                                    },
                                    {"name": "IOperator", "size": 1286},
                                    {
                                        "name": "label",
                                        "children": [
                                            {"name": "Labeler", "size": 9956},
                                            {"name": "RadialLabeler", "size": 3899},
                                            {"name": "StackedAreaLabeler", "size": 3202}
                                        ]
                                    },
                                    {
                                        "name": "layout",
                                        "children": [
                                            {"name": "AxisLayout", "size": 6725},
                                            {"name": "BundledEdgeRouter", "size": 3727},
                                            {"name": "CircleLayout", "size": 9317},
                                            {"name": "CirclePackingLayout", "size": 12003},
                                            {"name": "DendrogramLayout", "size": 4853},
                                            {"name": "ForceDirectedLayout", "size": 8411},
                                            {"name": "IcicleTreeLayout", "size": 4864},
                                            {"name": "IndentedTreeLayout", "size": 3174},
                                            {"name": "Layout", "size": 7881},
                                            {"name": "NodeLinkTreeLayout", "size": 12870},
                                            {"name": "PieLayout", "size": 2728},
                                            {"name": "RadialTreeLayout", "size": 12348},
                                            {"name": "RandomLayout", "size": 870},
                                            {"name": "StackedAreaLayout", "size": 9121},
                                            {"name": "TreeMapLayout", "size": 9191}
                                        ]
                                    },
                                    {"name": "Operator", "size": 2490},
                                    {"name": "OperatorList", "size": 5248},
                                    {"name": "OperatorSequence", "size": 4190},
                                    {"name": "OperatorSwitch", "size": 2581},
                                    {"name": "SortOperator", "size": 2023}
                                ]
                            },
                            {"name": "Visualization", "size": 16540}
                        ]
                    }
                ]
            };
            chartMain(objJson);
            chartBar();
        });

        function chartMain(objJson) {

            var width = 600,
                height = 390,
                radius = (Math.min(width, height) / 2) - 10;

            var formatNumber = d3.format(",d");

            var x = d3.scaleLinear()
                .range([0, 2 * Math.PI]);

            var y = d3.scaleSqrt()
                .range([0, radius]);

            var color = d3.scaleOrdinal(d3.schemeCategory20);

            var partition = d3.partition();

            var arc = d3.arc()
                .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
                .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
                .innerRadius(function(d) { return Math.max(0, y(d.y0)); })
                .outerRadius(function(d) { return Math.max(0, y(d.y1)); });


            var svg = d3.select("#chartTasks").append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

            // d3.json("/data/flare.json", function(error, root) {
            let root = objJson;
                // if (error) throw error;
                root = d3.hierarchy(root);
                root.sum(function(d) { return d.size; });
                svg.selectAll("path")
                    .data(partition(root).descendants())
                    .enter().append("path")
                    .attr("d", arc)
                    .style("fill", function(d) { return color((d.children ? d : d.parent).data.name); })
                    .on("click", click)
                    .append("title")
                    .text(function(d) { return d.data.name + "\n" + formatNumber(d.value); });
            // });

            function click(d) {
                svg.transition()
                    .duration(750)
                    .tween("scale", function() {
                        var xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
                            yd = d3.interpolate(y.domain(), [d.y0, 1]),
                            yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
                        return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
                    })
                    .selectAll("path")
                    .attrTween("d", function(d) { return function() { return arc(d); }; });
            }

            d3.select(self.frameElement).style("height", height + "px");


        }
        function chartBar() {
            // create the svg
            var svg = d3.select("#chartBar").append("svg").attr('width', "550").attr('height', "390"),
                margin = {top: 20, right: 20, bottom: 30, left: 40},
                width = +svg.attr("width") - margin.left - margin.right,
                height = +svg.attr("height") - margin.top - margin.bottom,
                g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// set x scale
            var x = d3.scaleBand()
                .rangeRound([0, width])
                .paddingInner(0.05)
                .align(0.1);

// set y scale
            var y = d3.scaleLinear()
                .rangeRound([height, 0]);

// set the colors
            var z = d3.scaleOrdinal()
                .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

// load the csv and create the chart
            d3.csv("/data/age-groups.csv", function(d, i, columns) {
                for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
                d.total = t;
                return d;
            }, function(error, data) {
                if (error) throw error;

                var keys = data.columns.slice(1);

                data.sort(function(a, b) { return b.total - a.total; });
                x.domain(data.map(function(d) { return d.State; }));
                y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
                z.domain(keys);

                g.append("g")
                    .selectAll("g")
                    .data(d3.stack().keys(keys)(data))
                    .enter().append("g")
                    .attr("fill", function(d) { return z(d.key); })
                    .selectAll("rect")
                    .data(function(d) { return d; })
                    .enter().append("rect")
                    .attr("x", function(d) { return x(d.data.State); })
                    .attr("y", function(d) { return y(d[1]); })
                    .attr("height", function(d) { return y(d[0]) - y(d[1]); })
                    .attr("width", x.bandwidth())
                    .on("mouseover", function() { tooltip.style("display", null); })
                    .on("mouseout", function() { tooltip.style("display", "none"); })
                    .on("mousemove", function(d) {
                        console.log(d);
                        var xPosition = d3.mouse(this)[0] - 5;
                        var yPosition = d3.mouse(this)[1] - 5;
                        tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                        tooltip.select("text").text(d[1]-d[0]);
                    });

                g.append("g")
                    .attr("class", "axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x));

                g.append("g")
                    .attr("class", "axis")
                    .call(d3.axisLeft(y).ticks(null, "s"))
                    .append("text")
                    .attr("x", 2)
                    .attr("y", y(y.ticks().pop()) + 0.5)
                    .attr("dy", "0.32em")
                    .attr("fill", "#000")
                    .attr("font-weight", "bold")
                    .attr("text-anchor", "start");

                var legend = g.append("g")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", 10)
                    .attr("text-anchor", "end")
                    .selectAll("g")
                    .data(keys.slice().reverse())
                    .enter().append("g")
                    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

                legend.append("rect")
                    .attr("x", width - 19)
                    .attr("width", 19)
                    .attr("height", 19)
                    .attr("fill", z);

                legend.append("text")
                    .attr("x", width - 24)
                    .attr("y", 9.5)
                    .attr("dy", "0.32em")
                    .text(function(d) { return d; });
            });

            // Prep the tooltip bits, initial display is hidden
            var tooltip = svg.append("g")
                .attr("class", "tooltip")
                .style("display", "none");

            tooltip.append("rect")
                .attr("width", 60)
                .attr("height", 20)
                .attr("fill", "white")
                .style("opacity", 0.5);

            tooltip.append("text")
                .attr("x", 30)
                .attr("dy", "1.2em")
                .style("text-anchor", "middle")
                .attr("font-size", "12px")
                .attr("font-weight", "bold");

        }
    }
);