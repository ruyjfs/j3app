// import angular from 'angular';



if (Meteor.isClient) {
    ptBR = {
        //  Menu
        'Home': 'Início',
        'Organizations': 'Organizações',
        'You organizations': 'Suas organizações',
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

        'Company focused on changing the world with the best of technology': 'Empresa voltada à mudar o mundo com o melhor da tecnologia',
        'Starting small but with a giant dream': 'Começando pequeno mas com um sonho gigante',

        //HELP
        'Here you register organizations or saying best companies within the companies you register people and products of it. It may be published for all people can sail. Note that the namespace is the organization\'s url to facilitate their direct access to a orgnização or if you want to disclose it. For example www.j3scrum.com/namespaceoforganization/namespaceofproduct/numberofsprint. Organizations can have multiple Teams. Teams can have Differing permissions. Namespace is unique and this is where repositories for this organization will be created.':
            'Aqui você cadastra as organizações ou dizendo melhor as empresas, dentro das empresas você cadastra as pessoas e os produtos dela. Podendo ser publica para todas as pessoas poderem vela. Repare que o namespace é a url da organização para facilitar o seu acesso direto à uma orgnização ou caso queira divulga-la. Por exemplo www.j3scrum.com/namespacedaorganizacao/namespacedoproduto/numerodasprint. As organizações podem ter várias equipes. As equipes podem ter diferentes permissões. Namespace é único e é aí que repositórios para esta organização será criado.',

        // Scrum - Form - Organization
        'How we should call your organization': 'Como devemos chamar sua organização',
        'This is the name of the organization url and must be unique': 'Este é o nome da url da organização e deve ser único',
        'How we should find your organization': 'Como devemos encontrar suar organização',
        'Namespace already exists': 'Este namespace já existe',
        'Notice': 'Aviso',
        'Saved successfully': 'Salvo com sucesso',

        // Scrum - Form - Product
        'How we should find this product of organization': 'Como devemos encontrar este produto da organizzação',
        'The product url must be unique in the organization': 'O nome da url do produto deve ser único dentro desta organização',
        'How should we call this product': 'Como devemos chamar este produto',
        'Namespace already exists for a product in this organization': 'Este namespace já existe dentro desta organização',
        // Scrum - Form - Team
        'How we should call this team' : 'Como devemos chamar essa equipe',
        'Who are the members of this team' : 'Quais são os integrantes dessa equipe',
        // Scrum - Form - Status
        'How we should call this status' : 'Como devemos chamar essa situação',
        // Scrum - Form - Status
        'How we should call this story' : 'Como devemos chamar essa história',
        // Scrum - Form - Status
        'How should we understand this task' : 'Como devemos entender essa tarefa',
        // Scrum - Form - Status
        'This task belongs to which story' : 'Essa tarefa pertence a qual história',

        'Task sent to trash' : 'Tarefa enviada pra lixeira',
        'Story sent to trash' : 'História enviada pra lixeira',
        'Status sent to trash' : 'Situação enviada pra lixeira',

        'Restored history' : 'História restaurada',
        'Restored status' : 'Situação restaurada',
        'Restored tarsk' : 'Tarefa restaurada',

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
        'Active team now': 'Membros ativos agora',
        'Tasks completed': 'Tarefas concluídas',
        'Task amount previous sprint (Remaining/Total)': 'Quantidade de tarefas na sprint anterior (Restantes/Total)',
        'Task amount current sprint (Remaining/Total)': 'Quantidade de tarefas na sprint atual (Restantes/Total)',
        'Task amount next sprint (Remaining/Total)': 'Quantidade de tarefas na próxima sprint (Restantes/Total)',

        'made by': 'feito por',
        'Login or Register': 'Entre ou Cadastre-se',
        'Coming soon!': 'Em breve!',
        'Goal': 'Meta',

        // Kanban
        'Product backlog': 'Backlog do produto',
        'Previous sprint backlog': 'Sprint anterior',
        'Current sprint backlog': 'Sprint atual',
        'Next sprint backlog': 'Próxima sprint',
        'Nonexistent Sprint!': 'Não é possível por a tarefa nesta sprint.',
        'To-do': 'A fazer',
        'Done': 'Pronto',
        'Ownerless': 'Sem responsável',
        'Add Status': 'Adicionar um status',
        'Add Task': 'Adicionar uma tarefa',
        'Add Story': 'Adicionar uma história',
        'Add Organization': 'Adicionar uma organização',
        'Add Product': 'Adicionar um produto',
        'Add Team': 'Adicionar uma equipe',

        'Week': 'Semana',
        'Skip weekend': 'Pular finais de semana',
        'Created at': 'Criado em',
        'Created by': 'Criado por',
        'Done in': 'Feito em',
        'Done by': 'Feito por',

        // Team
        'Time per member': 'Tempo por membro',

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
        'Products without organization': 'Produtos sem organização',

        'Teams': 'Equipes',
        'Members': 'Membros',
        'Products': 'Produtos',
        'Visualization': 'Visualização',

        'public': 'pública',
        'private': 'privada',

        'Private - Only product members': 'Privado - Apenas membros do produto',
        'Private - Only organization members': 'Privado - Apenas membros da organização',
        'Internal - Everyone in the organization': 'Interno - Todos da organização',
        'Public - Everyone can see': 'Público - Todos podem ver',

        'Type the name or email to add': 'Digite o nome ou email para adicionar',
        'Type the name or email to search': 'Digite o nome ou email para procurar',

        // Form
        'Select': 'Selecione',

        'Channel': 'Canal',
        'of': 'do',

        // Ryu
        'Welcome': 'Seja bem vindo(a)',
        'Hi': 'Oi',
        'Hello': 'Olá',
        "What's up": 'E ae',
        "Hi, I hope everything is okay with you": 'Olá, espero que esteja tudo bem com você',

        // Ryu Organization
        // 'Hi, my name is Ryu, i will help you with whatever it takes.' : 'Olá, meu nome é Ryu e irei ajudar no que for preciso.',
        'My name is Ryu, i will help you with whatever it takes.' : 'Meu nome é Ryu e irei ajudar no que for preciso.',
        'It looks like you do not have an organization yet, click the red button to create an organization, or contact the owner of an organization to add you to their organization.'
            : 'Parece que você não tem uma organização ainda, clique no botão vermelho para criar uma organização ou contate o dono de uma organização para adiciona-lo na organização dele',
        'You can create products without organization, just enter the card without organization. For more information, click on the question mark icon in the top menu.'
            : 'Você pode criar produtos sem organização, basta entrar no cartão sem organização. Para mais informações, clique no botão de interrogação no menu superior.',
        'If you have any questions or suggestions, please contact us at contact@j3scrum.com.'
            : 'Se tiver qualquer dúvida ou sugestão, por favor nos fale pelo e-mail contact@j3scrum.com.',
        'To close these messages, drag to the side.'
            : 'Para fechar essas mensages, arraste elas para o lado.',
        "I'm so glad you joined j3scrum, many things are still to come, best regards!!!"
            : 'Eu fico muito feliz que tenha entrado no j3scrum, muitas coisas ainda estão por vir, grande abraço!!!',
        "To know what an organization is, click on the question mark icon"
            : 'Para saber o que é uma organização, clique no ícone de interrogação',
        "Click here to register an organization or someone else to add it to an organization"
            : 'Clique aqui para cadastrar uma organização ou pessa para alguém adiciona-lo em uma organização',
        'in alpha' : 'em alfa',
        // HELP Organization
        'What is a organization' : 'O que é uma organização',
        'What you can do on the organization screen' : 'O que você pode fazer na tela da organização',
        'An organization can be a company, a group of people, a government agency, among others.' :
            'Uma organização pode ser uma empresa, um grupo de pessoas, um orgão do governo, entre outros.',
        'Following the hierarchy in j3scrum, an organization, poussui several products and teams. Teams are made up of members of the organization. The products are composed of a team and various tasks, these tasks are separated by the schedule of each sprint and by stories, these stories are like categories that help to visualize them in the screen of Kanbam and Bakclog.':
            'Seguindo a hierarquia no j3scrum, uma organização, poussui vários produtos e times. Os times são composto por membros da organização. Os produtos são compostos por um time e várias tarefas, essas tarefas são separadas pelo cronograma de cada sprint e por histórias, essas histórias são como categorias que ajudam a visual-las na tela do Kanbam e Bakclog.',
        // Ryu Product
        'This is where the products of the organization are.' : 'Aqui é onde fica os produtos da organização.',
        'In scrum we call any type of project in a product.' : 'No scrum chamamos qualquer tipo de projeto em produto.',
        'To develop the whole product is necessary of several tasks and these tasks are to separate in cycles that we call sprints.' :
            'Para desenvolver todo o produto é necessário de várias tarefas e essas tarefas são separadas em ciclos que chamamos de sprints.',
        'Each cycle, in this case, each sprint has a start and end date, thus taking a timeline of each stage of the product.' :
            'Cada ciclo, no caso, cada sprint, tem uma data inicial e final, com isso tendo um cronograma de cada etapa do produto.',
        'At the end of each sprint, we were able to deliver something of value, not being the whole product, but dividing parts.' :
            'No final de cada sprint, conseguimos entregar algo de valor, sem ser o produto todo e sim entragas dividias por partes.',
        'Following the hierarchical order in j3scrum, an organization owns the products, a product has several sprints and each sprint have several tasks.' :
            'Seguindo a ordem hierárquica no j3scrum, uma organização possui os produtos, um produto possuí várias sprints e cada sprint pussuí várias tarefas.',
        'The idea is that if the final product is a motorcycle, you first deliver a bike, then a tricycle and in the end deliver the bike.' :
            'A idéia é que se o produto final for uma moto, primeiro você entrega uma bicicleta, depois um triciclo e no final entrega a moto.',
        'Careful to following this idea, do not go handing over a steering wheel, a seat and a wheel, that will not help.' :
            'Cuidado ao seguir essa idéia, não vá entregar um volante, um banco e uma roda, isso não vai servir de nada.',
        'Remember, deliveries with something of real value, something functional.' :
            'Lembre-se, entregas com algo de valor real, algo funcional.',
        'Relax, when entering the product you will know better how the scrum works and the main one as it is a kanban.' :
            'Relaxa ao entrar no produto você saberá melhor como o scrum funciona e o principal, como é um kanban.',
        'Click the red button to create a product.' :
            'Clique no botão vermelho para criar um produto.',
        "After creating a product, log in to get access to scrum features such as Kanban, Backlog, Burndown, among others. In short, you'll have access to everything your product is related to, including its tasks." :
            'Depois que criar um produto, entre nele para ter acesso às funcionalidades do scrum, como o Kanban, Backlog, Burndown, entre outros, resumindo você terá acesso à tudo que o seu produto está relacionado, incluindo as tarefas dele.',
        'Do not forget, every screen has the question button in the upper corner to better explain the scrum and the functionality of each screen.' :
            'Não se esqueca, toda tela tem o botão de interrogação no canto superior para explicar melhor o scrum e as funcionalidades de cada tela.',
        'Good luck with the product!!!' : 'Boa sorte com o produto',
        // MODAL HELP
        'What is a j3scrum': 'O que é o j3scrum',
        'What is a product': 'O que é um produto',
        'What you can do on the product screen': 'O que se pode fazer na tela do produto',
        'You can view your products, the products you are part of, and the products in your organization that are shared internally or publicly':
            'Você pode visualizar os seus produtos, os produtos que você faça parte e os produtos da organização que estão compartilhados internamente ou públicos',
        'You can be part of a product being in the team linked to the product or being as PO or Scrum Master':
            'Você pode fazer parte de um produto estando no time vinculado ao produto ou estando como PO ou Scrum Master',
        'You can only edit projects that you own. Before registering a product, first register a team that will be part of the product, you can link the team to your new product created':
            'Você só pode editar projetos que você seja o dono. Antes de cadastrar um produto, primeiro cadastre uma equipe que vai fazer parte do produto, você pode vincular o time ao seu novo produto criado',

        // Ryu Kanban
        // Ryu Backlog


        // MODAL HELP
        'Close' : 'Fechar',



        // Modulo User
        'Contacts' : 'Contatos',
        'Username' : 'Nome de usuário',
        // 'Name' : 'Nome',
        'Add contact' : 'Adicionar contato',
        // 'Last name' : 'Último nome'
    };
    angular.module('scrum', [
        'angular-meteor',
        'angular-meteor.auth',
        'ui.router',
        'angularUtils.directives.dirPagination',
        //'uiGmapgoogle-maps',
        //'ngCookies',
        'ngMaterial',
        'pascalprecht.translate'
        //'utilsPagination'
    ]).config(function ($translateProvider) {
        let strLang;
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
                    strLang = window.navigator.userLanguage || window.navigator.language || 'en-US';
                    Meteor.call('userSave', {_id: objUser._id, language: strLang}, function (error) {});
                } else {
                    strLang = objUser.language;
                }
                $translateProvider.preferredLanguage(strLang);
                $translateProvider.use(strLang);
                Session.set('lang', strLang);
                return objUser;
            });
        } else {
            strLang = window.navigator.userLanguage || window.navigator.language || 'en-US';
            $translateProvider.preferredLanguage(strLang);
            Session.set('lang', strLang);
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

    // angular.module('scrum', []).run(function ($rootScope, ngProgressFactory) {
    // angular.module('scrum', []).run(function ($rootScope) {
    // //
    // //     // first create instance when app starts
    // //     $rootScope.progressbar = ngProgressFactory.createInstance();
    // //
    //     $rootScope.$on("$routeChangeStart", function () {
    // //         $rootScope.progressbar.start();
    //         console.log('começo');
    //     });
    // //
    //     $rootScope.$on("$routeChangeSuccess", function () {
    // //         $rootScope.progressbar.complete();
    //         console.log('termino');
    //     });
    // });

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
