//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('HelpPageModalCtrl', [ '$scope', '$mdDialog', '$stateParams', '$reactive', '$location',
    function ($scope, $mdDialog, $stateParams, $reactive, $location) {
        //$reactive(this).attach($scope);


        var arrHelpMessagePage = [
            {link: 'scrum', title: 'Scrum', msg:
                'j3scrum é um sistema totalmente gratuito focado na metodogia SCRUM, que atualmente é muito utilizada pela TI, porém pode ser utilizado em outras areas também. ' +
                'No j3scrum você pode cadastrar os integrantes da sua equipe, montar e dividir as suas equipes, criar seu projeto, criar as estorias do projeto e os postits ficarem bem organizados. Você pode escolher as cores dos postits de cada projeto, assim ficando mais visivel no Kanban de todas as suas equipes. ' +
                'Experimente, ele é totalmente gratuito mesmo, não custa nada. ' +
                'Estamos à disposição para melhorias, ajustes e novas idéias também. ' +
                'Não sabe o que é a metodoliga SCRUM acesse: <a href="www.desenvolvimentoagil.com.br" target="_blank">www.desenvolvimentoagil.com.br</a> e saiba muito mais. '
            },
            {link: 'scrum/product', title: 'Product and Team', msg:
                'Olá, nessa tela você pode visualizar os produtos que você criou e os produtos que ' +
                'você participa, seja você estando no time vinculado ao projeto ou estando como PO ou Scrum Master. ' +
                'Você só pode editar projetos que você seja o dono. Em todas as telas com o botão mais (+) você pode ' +
                'incluir algo, então inclua um time para o projeto e logo em seguida o produto, vinculando o time ao seu novo produto criado.'
            },
            {link: 'scrum/sprint', title: 'Sprint', msg:
                'Uma sprint é um ciclo, todo ciclo tem uma data inicial e data final. ' +
                'No topo desta tela tem uma data e um número antes da data (Ex: (1) 17/04/2016 - 23/04/2016), este número equivale ao número da sprint e a data é a data inicial e data final. ' +
                'Você pode mudar de sprint clicando na data que está no topo da tela, ao mudar de sprint reflete automaticamente ao Backlog, Kanban e Burndown. ' +
                'A sprint é criada automaticamente, conforme a data atual e quantidade de semanas que foi definido no cadastro do produto, você pode apenas editar as datas da sprint. '
            },
            {link: 'scrum/status', title: 'Status', msg:
                'O Status é a situação das tarefas. ' +
                'A situação é utilizada no Kanban, para os integrantes do projeto seguir o processo que foi definido aqui para este produto. ' +
                'Tem duas situaçẽos fixas que você não poderá alterar, são elas: "To do" (À fazer) e "Done" (Pronto), essas situações ja vem pré-definido sempre na tela do Kanban' +
                'e não é exibido nesta tela. Quando uma tarefa no Kanban fica no status "To do" significa que é uma tarefa para alguem da equipe fazer e no status "Done", significa ' +
                'que é uma tarefa concluída, toda tarefa concluída no kanban, fica com a cor cinza no BackLog.' +
                'Você pode adicionar quantos status quiser, podendo também escolher a ordem deles.'
            },
            {link: 'scrum/story', title: 'Story', msg:
                'A História é um agrupamento de tarefas, a história é o que define as cores dos postits e separação no Kanban. ' +
                'Você pode definir as histórias do produto de diversas formas, por exemplo: ' +
                'Exemplo 1: Tarefas relacionado ao cadastro de usuário, pesquisa de usuário, deletar o usuário, essas são tarefas da História Usuário que tem a cor Azul. ' +
                'Exemplo 2: Definir a história pelo tipo, como: Novas, Manutenção, Refatoração, Idéias e Erro' +
                'Lembrando que para adicionar uma tarefa, é bom você adicionar primeiro uma História. Com isso deixando o seu Kanban e Backlog bem dividido e colorido. '
            },
            {link: 'scrum/backlog', title: 'Backlog',  msg:
                'Aqui podemos ver todas as tarefas que estão no backlog e fazer o planejamento das tarefas e sprint, adicionando também mais tarefas.'
            },
            {link: 'scrum/kanban', title: 'Kanban', msg:
                'Aqui podemos ver todas as tarefas da sprint atual separadas por história. ' +
                'As tarefas da sprint atual é definido na tela BackLog. ' +
                'O Kanban informa também a situação de cada tarefa, quem é responsável por cada tarefa, ' +
                'é um mural da transparência onde todo mundo pode ver a tarefa de cada um e o que cada um está fazendo. ' +
                'Os integrantes do projeto não precisa ficar informando o tempo todo o que está fazendo, basta olhara par ao Kanban que todo mundo sabe. '
            },
            {link: 'scrum/productkanban', title: 'Kanban', msg:
                'Aqui podemos ver todas as tarefas da sprint atual separadas por história. ' +
                'As tarefas da sprint atual é definido na tela BackLog. ' +
                'O Kanban informa também a situação de cada tarefa, quem é responsável por cada tarefa, ' +
                'é um mural da transparência onde todo mundo pode ver a tarefa de cada um e o que cada um está fazendo. ' +
                'Os integrantes do projeto não precisa ficar informando o tempo todo o que está fazendo, basta olhara par ao Kanban que todo mundo sabe. '
            },
            {link: 'scrum/burndown', title: 'Burndown', msg:
                'No burndown todos os membros da equipe, vê em forma de gráfico como está o desempenho do projeto, ' +
                'olhando para este gráfico da pra medir se vamos conseguir entregar todas as tarefas da sprint no prazo ou não. ' +
                'A linha vermelha informa como seria o ideal e o amarelo informa o desempenho atual da equipe. ' +
                'Não se preocupe no começo o gráfico não vai ficar conforme o esperado, pois leva um tempo para a equipe ir amadurecendo e se acostumar com este tipo de metodologia. '
            },
            {link: 'scrum/product-team', title: 'Team of product', msg:
                'Aqui você vê todos os integrantes agrupados por equipes que estão neste produto. ' +
                'Futuramente vai ter mais informações como, as tarefas que o membro da equipe tem na sprint anterior, atual e próxima sprint. ' +
                'Terá também 2 tipos de qualificação para os integrantes, medindo a media de horas que o integrante ja fez para o projeto ' +
                ' e o mais importante, se o integrante entregar as tarefas no prazo, vai ganhando estrelas. ' +
                'Essas qualificações serão informadas com estrelas de 1 à 5 estrelas. ' +
                'Lembrando que não foi implementado ainda mas é uma idéia que logo será implementada, aceitamos sugestões, opiniões e criticass. ' +
                'Basta falar com o Ruy Ferreira pelo chat, criador do j3scrum. '
            }
        ];
        if ($location.path()) {
            arrUrl = $location.path().split('/');
            strModule = arrUrl[1];

            if (arrUrl[2]) {
                strController = arrUrl[2];
            } else {
                strController = '';
            }

            var helpTitle = '';
            var helpMsg = '';
            arrHelpMessagePage.forEach(function(arrValue, intKey){
                strLink = arrValue.link;
                strTitle = arrValue.title;
                strMsg = arrValue.msg;
                if ((strController && strModule+'/'+strController == strLink) || strModule == strLink) {
                    title = strTitle;
                    msg = strMsg;
                }
            });
            $scope.helpTitle = title;
            $scope.helpMsg = msg;
            console.info($scope.helpMsg );
        }


        $scope.helpers({
            stories: function () {
                //return Story.find({projectId: $stateParams.id}, {sort: {name: 1}});
            }
        });
        $scope.save = function () {
            //Meteor.call('noteSave', $scope.form, function (error) {
            //
            //    if ($scope.projectIdOld != $scope.form.projectId) {
            //        $scope.form.story = '';
            //        $scope.form.sprintId = '';
            //        $scope.form.statusId = '';
            //    }
            //
            //    if (error) {
            //        Materialize.toast('Erro: ' + error, 4000);
            //    } else {
            //        Materialize.toast('Saved successfully!', 4000);
            //        $scope.form = '';
            //        $mdDialog.hide();
            //    }
            //});
        };

        $scope.close = function () {
            $mdDialog.hide();
        }
    }
]);