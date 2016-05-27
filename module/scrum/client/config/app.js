if (Meteor.isClient) {
    ptBR = {
        //  Menu
        "Home": "Principal",
        "Language": "Linguagem",
        "Settings": "Configuração",
        "Options": "Opções",
        "Exit": "Sair",
        "English": "Inglês",
        "Portuguese": "Português",
        "About this page": "Sobre esta página",


        // Home
        "The J3scrum you can create your post its (Tasks), and set them by category (History) and puts them on a project (Product) that his will be composed of your team": "No j3scrum você pode criar os seus postits (Tarefas) e defini-los por categoria (História) e coloca-los em um projeto (Produto) seu que será composto pelo seu time",
        "Please log in or register to get access to your scrum": "Realize o login ou se cadastre para ter acesso ao seu scrum",
        "Speeds up development": "Acelera o desenvolvimento",
        "User experience focused": "Utilize experiência focada",
        "Easy to work with": "Fácil de trabalhar",
        "A modern way of using the agile development methodology SCRUM": "Uma forma moderna de utilizar a metodologia ágil de senvolvimento SCRUM",

        //  Scrum
        "Team": "Equipe",
        "Delete": "Deletar",
        "Edit": "Editar",
        "Change": "Alterar",
        "Enter": "Entrar",
        "Product": "Produto",
        "Add": "Adicionar",
        "Story": "História",
        "Status": "Situação",
        "Trash": "Lixeira",
        "Task": "Taréfa",
        "Edit task": "Editar taréfa",
        "Delete task": "Deletar taréfa",
        "Edit story": "Editar história",
        "Visualize": "Visualizar",
        "Time": "Tempo",
        "Color": "Cor",
        "Order": "Ordem",
        "Task amount previous sprint (Remaining/Total)": "Quantidade de tarefas na sprint anterior (Restantes/Total)",
        "Task amount current sprint (Remaining/Total)": "Quantidade de tarefas na sprint atual (Restantes/Total)",
        "Task amount next sprint (Remaining/Total)": "Quantidade de tarefas na próxima sprint (Restantes/Total)",

        "made by": "feito por",
        "Login / Register": "Entre / Cadastre-se",
        "Coming soon!": "Em breve!",

        // Kanban
        "Product backlog": "Backlog do produto",
        "Previous sprint backlog": "Sprint anterior",
        "Current sprint backlog": "Sprint atual",
        "Next sprint backlog": "Próxima sprint",
        "Nonexistent Sprint!": "Não é possível por a tarefa nesta sprint.",
        "To-do": "A fazer",
        "Done": "Pronto",

        "Week": "Semana",
        "Skip weekend": "Pular finais de semana",

        // Team
        "Time per member": "Tempo por membro",
        "Members": "Membros",

        // Outros
        "Save": "Salvar",
        "Insert": "Inserir",
        "Cancel": "Cancelar",
        "Description": "Descrição",

        "Name": "Nome",
        "Owner": "Dono",

        // Listagem.
        "Search": "Procurar",
        "Sort order": "Ordenar",
        "Ascending": "Crescente",
        "Descending": "Decrescente",

        "Posted by": "Postado por",
        "Hello": "Olá",
        "Chat": "Bate-papo",
        "Login": "Realizar Login",
        "Sign up": "Cadastrar",
        "Sign in": "Entrar",

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
        $translateProvider.translations('de', {
            TITLE: 'Hallo',
            FOO: 'Dies ist ein Paragraph.',
            BUTTON_LANG_EN: 'englisch',
            BUTTON_LANG_DE: 'deutsch'
        });
        $translateProvider.preferredLanguage('pt-BR');
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