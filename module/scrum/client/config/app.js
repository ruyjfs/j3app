if (Meteor.isClient) {
    ptBR = {
        //  Menu
        'Home': 'Principal',
        'Language': 'Linguagem',
        'Settings': 'Configuração',
        'Options': 'Opções',
        'Exit': 'Sair',
        'English': 'Inglês',
        'Portuguese': 'Português',
        'About this page': 'Sobre esta página',

        // Home
        'SCRUM in an easy, fast and free you take your pocket to wherever you go with any device': 'SCRUM em uma forma fácil, rápida e gratuíta que você leva seu bolso, a onde você for com qualquer dispositivo',
        'In J3scrum you can create tasks, set them by history / category and puts them into a product which is composed of a team': 'No j3scrum você pode criar as suas tarefas, defini-las por história/categoria e coloca-las em um produto, que será composto por uma ou várias equipes',
        'Log in or sing up to access': 'Entre ou se cadastre para ter acesso',
        'Enjoy is free and always will be': 'Aproveite é gratuito e sempre será',
        'With only one account you will have access to all the j3rotherhood offers': 'Com apenas uma conta você terá acesso à tudo que a j3rotherhood oferece',
        'Agility and flexibility': 'Agilidade e flexibilidade',
        'Transparency and a team focused': 'Transparência e uma equipe focada',
        'Easy to work with': 'Fácil de trabalhar',
        'On the methodology': 'Sobre a metodologia',
        'Scrum is an agile method for management and planning software projects': 'Scrum é uma metodologia ágil para gestão e planejamento de projetos de software',
        'In Scrum, projects are divided into cycles (typically monthly) called Sprints. Sprint represents a Box Time within which a set of activities to be executed. Agile software development is iterative, the work is divided into iterations, which are Sprint calls when Scrum':
            'No Scrum, os projetos são dividos em ciclos (tipicamente mensais) chamados de Sprints. O Sprint representa um Time Box dentro do qual um conjunto de atividades deve ser executado. Metodologias ágeis de desenvolvimento de software são iterativas, ou seja, o trabalho é dividido em iterações, que são chamadas de Sprints no caso do Scrum',
        'The features to be implemented in a project are kept in a list which is known as Product Backlog. At the beginning of each sprint, it is a Sprint Planning Meeting, ie a planning meeting in which the Product Owner prioritizes the Product Backlog items and the team selects the activities she will be able to implement during the Sprint begins . The tasks allocated on a Sprint are transferred from the Product Backlog to the Sprint Backlog':
            'As funcionalidades a serem implementadas em um projeto são mantidas em uma lista que é conhecida como Product Backlog. No início de cada Sprint, faz-se um Sprint Planning Meeting, ou seja, uma reunião de planejamento na qual o Product Owner prioriza os itens do Product Backlog e a equipe seleciona as atividades que ela será capaz de implementar durante o Sprint que se inicia. As tarefas alocadas em um Sprint são transferidas do Product Backlog para o Sprint Backlog',
        'Every day of a sprint, the team makes a brief meeting (usually in the morning), called Daily Scrum. The aim is to disseminate knowledge about what was done the day before, identify impediments and prioritize the day\'s work begins':
            'A cada dia de uma Sprint, a equipe faz uma breve reunião (normalmente de manhã), chamada Daily Scrum. O objetivo é disseminar conhecimento sobre o que foi feito no dia anterior, identificar impedimentos e priorizar o trabalho do dia que se inicia',
        'At the end of a sprint, the team has the features implemented in a Sprint Review Meeting':
            'Ao final de um Sprint, a equipe apresenta as funcionalidades implementadas em uma Sprint Review Meeting',
        'Finally, it is a Sprint Retrospective and the team of planning the next sprint':
            'Finalmente, faz-se uma Sprint Retrospective e a equipe parte para o planejamento do próximo Sprint',
        //  Scrum
        'Team': 'Equipe',
        'Delete': 'Deletar',
        'Edit': 'Editar',
        'Change': 'Alterar',
        'Enter': 'Entrar',
        'Product': 'Produto',
        'Add': 'Adicionar',
        'Story': 'História',
        'Status': 'Situação',
        'Trash': 'Lixeira',
        'Task': 'Taréfa',
        'Edit task': 'Editar taréfa',
        'Delete task': 'Deletar taréfa',
        'Edit story': 'Editar história',
        'Visualize': 'Visualizar',
        'Time': 'Tempo',
        'Color': 'Cor',
        'Order': 'Ordem',
        'Task amount previous sprint (Remaining/Total)': 'Quantidade de tarefas na sprint anterior (Restantes/Total)',
        'Task amount current sprint (Remaining/Total)': 'Quantidade de tarefas na sprint atual (Restantes/Total)',
        'Task amount next sprint (Remaining/Total)': 'Quantidade de tarefas na próxima sprint (Restantes/Total)',

        'made by': 'feito por',
        'Login or Register': 'Entre ou Cadastre-se',
        'Coming soon!': 'Em breve!',

        // Kanban
        'Product backlog': 'Backlog do produto',
        'Previous sprint backlog': 'Sprint anterior',
        'Current sprint backlog': 'Sprint atual',
        'Next sprint backlog': 'Próxima sprint',
        'Nonexistent Sprint!': 'Não é possível por a tarefa nesta sprint.',
        'To-do': 'A fazer',
        'Done': 'Pronto',

        'Week': 'Semana',
        'Skip weekend': 'Pular finais de semana',
        'Created at': 'Criado em',

        // Team
        'Time per member': 'Tempo por membro',
        'Members': 'Membros',

        // Outros
        'Save': 'Salvar',
        'Insert': 'Inserir',
        'Cancel': 'Cancelar',
        'Description': 'Descrição',
        'You': 'Você',
        'Type the message': 'Digite a mensagem',
        'Send': 'Enviar',

        'Name': 'Nome',
        'Last name': 'Sobrenome',
        'Owner': 'Dono',

        // Listagem.
        'Search': 'Procurar',
        'Sort order': 'Ordenar',
        'Ascending': 'Crescente',
        'Descending': 'Decrescente',

        'Posted by': 'Postado por',
        'Hello': 'Olá',
        'Chat': 'Bate-papo',
        'Login': 'Realizar Login',
        'Sign up': 'Cadastrar',
        'Sign in': 'Entrar',
        'Password': 'Senha',
        'Create account': 'Criar uma conta',
        'Forgot password?': 'Esqueceu a senha?',
        'Confirm password': 'Confirmar senha',
        'Reset password': 'Resetar senha',

        // Organization
        'Organization': 'Organização',
        'Organization full name': 'Nome completo da organização',
        'No organization': 'Sem organização',
        'No organization projects': 'Projetos sem organização',

        'Type the name or email to add': 'Digite o nome ou email para adicionar',
        'Type the name or email to search': 'Digite o nome ou email para procurar',

        'Channel': 'Canal',
        'of': 'do',
    };

    angular.module('scrum', [
        'angular-meteor',
        'angular-meteor.auth',
        'ui.router',
        'angularUtils.directives.dirPagination',
        //'uiGmapgoogle-maps',
        //'ngCookies',
        'ngMaterial',
        'pascalprecht.translate',
        //'utilsPagination'
    ]).config(function ($translateProvider) {
        $translateProvider.translations('pt-BR', ptBR);
        $translateProvider.translations('en-US', {});
        $translateProvider.translations('de', {
            TITLE: 'Hallo',
            FOO: 'Dies ist ein Paragraph.',
            BUTTON_LANG_EN: 'englisch',
            BUTTON_LANG_DE: 'deutsch'
        });

        if (Meteor.userId()) {
            Meteor.subscribe('users', function(){
                objUser = Meteor.users.findOne(Meteor.userId());
                if (!objUser.language) {
                    strLanguage = window.navigator.userLanguage || window.navigator.language || 'en-US';
                    Meteor.call('userSave', {_id: objUser._id, language: strLanguage}, function (error) {});
                } else {
                    strLanguage = objUser.language;
                }
                $translateProvider.preferredLanguage(strLanguage);
                $translateProvider.use(strLanguage);
                return objUser;
            });
        } else {
            strLanguage = window.navigator.userLanguage || window.navigator.language || 'en-US';
            $translateProvider.preferredLanguage(strLanguage);
        }
        $translateProvider.useSanitizeValueStrategy(null);
    }).directive('teste', function () {
        return 'asdasdasdasdasd';
        //return {
        //restrict: 'A',
        //link: function(scope,element,attrs){
        //    element.bind('click',function(){
        //        scope.$eval(attrs.sonClick);
        //    })
        //}
        //};
    }).config(function (paginationTemplateProvider) {
        paginationTemplateProvider.setPath('library/directives/pagination.tpl.html');
    });

    //angular.module('scrum')
    //    .config(function($mdThemingProvider){
    //        $mdThemingProvider.theme('scrum')
    //            .dark()
    //            .primaryPalette('grey', {
    //                'default': '900',
    //            })
    //            .warnPalette('red', {
    //                'default': '900',
    //            })
    //            .accentPalette('orange', {
    //                'default': 'A700',
    //            });
    //
    //        //$mdThemingProvider.setDefaultTheme('default');
    //        //
    //        //$mdThemingProvider.alwaysWatchTheme(true);
    //    });

    //angular.module('brotherhood')
    //    .config(function($mdThemingProvider) {
    //        $mdThemingProvider.theme('altTheme')
    //            .primaryPalette('purple'),
    //
    //                $mdThemingProvider.theme('altTheme')
    //                    .primaryPalette('purple')
    //             // specify primary color, all
    //        // other color intentions will be inherited
    //        // from default
    //    });

    //angular.module('brotherhood')
    //    .config(function($mdThemingProvider) {
    //        $mdThemingProvider.theme('altTheme')
    //            .primaryPalette('purple') // specify primary color, all
    //        // other color intentions will be inherited
    //        // from default
    //    });

    //$mdThemingProvider.setDefaultTheme('altTheme');


    //$mdThemingProvider.alwaysWatchTheme(true);

}