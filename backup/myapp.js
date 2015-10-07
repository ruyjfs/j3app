//if (Meteor.isServer) {
//    Meteor.startup(function () {
//        // code to run on server at startup
//
//        //Accounts.loginServiceConfiguration.insert({
//        //    service: '',
//        //    clientId: '',
//        //    secret: ''
//        //});
//        ServiceConfiguration.configurations.upsert(
//            { service: "weibo" },
//            { $set: { clientId: "1292962797", secret: "75a730b58f5691de5522789070c319bc" } }
//        );
//
//        //ServiceConfiguration.configurations.upsert(
//        //    { service: "weibo" },
//        //    {
//        //        $set: {
//        //            clientId: "1292962797",
//        //            loginStyle: "popup",
//        //            secret: "75a730b58f5691de5522789070c319bc"
//        //        }
//        //    }
//        //);
//
//        // In a JS file that's loaded on the client and the server
//        Posts = new Mongo.Collection("posts");
//        Comments = new Mongo.Collection("comments");
//
//        //Posts.insert({
//        //    //createdBy: Meteor.userId(),
//        //    createdBy: 12345,
//        //    createdAt: new Date(),
//        //    title: "My 2 post!",
//        //    content: "Today was a good day."
//        //});
//
//        //Posts.insert({
//        //    createdBy: Meteor.userId(),
//        //    createdAt: new Date(),
//        //    title: "My 2 post!",
//        //    content: "Today was a good day."
//        //});
//
//        //teste = Posts.update({
//        //    title: {$regex: /first/}
//        //}, {
//        //    $set: {content: "Tomorrow will be a great day."}
//        //});
//        //debugger
//        //console.log(teste);
//
//        //debugFunc(teste);
//    });
//}
//
//
//
//if (Meteor.isClient) {
//    // counter starts at 0
//    Session.setDefault('counter', 0);
//
//    Template.hello.helpers({
//        counter: function () {
//            return Session.get('counter');
//        }
//    });
//
//    Template.hello.events({
//        'click button': function () {
//            // increment the counter when button is clicked
//            Session.set('counter', Session.get('counter') + 1);
//        }
//    });
//
//    Template.nametag.helpers({
//        name: "Ben Bitdiddle"
//    });
//
//    Template.welcomePage.helpers({
//        people: [{name: "Bob"}, {name: "Frank"}, {name: "Alice"}]
//    });
//
//    Template.profilePage.helpers({
//        username: function () {
//            return Meteor.user() && Meteor.user().username;
//        }
//    });
//
//    Template.post.helpers({
//        commentCount: function (numComments) {
//            if (numComments === 1) {
//                return "1 comment";
//            } else {
//                return numComments + " comments";
//            }
//        }
//    });
//
//    Template.example.events({
//        "click .my-button": function (event, template) {
//            alert("My button was clicked!");
//        },
//        "submit form": function (event, template) {
//            var inputValue = event.target.myInput.value;
//            var helperValue = this;
//            alert(inputValue, helperValue);
//        }
//    });
//
//    // In your JavaScript
//    Template.main.helpers({
//        theEnemy: function () {
//            return Session.get("enemy");
//        }
//    });
//
//    //Session.set("enemy", "Eastasia");
//// Page will say "We've always been at war with Eastasia"
//
//    //Session.set("enemy", "Eurasia");
//// Page will change to say "We've always been at war with Eurasia"
//
//    //Tracker.autorun(function () {
//    //    var celsius = Session.get("celsius");
//    //    Session.set("fahrenheit", celsius * 9/5 + 32);
//    //});
//
//    // Initialize a session variable called "counter" to 0
//    //Session.set("counter", 0);
//
//    // Initialize a session variable called "counter" to 0
//    //Session.set("counter", 0);
//
//    // The autorun function runs but does not alert (counter: 0)
//    //Tracker.autorun(function (computation) {
//    //    if (Session.get("counter") === 2) {
//    //        computation.stop();
//    //        alert("counter reached two");
//    //    }
//    //});
//
//    // The autorun function runs but does not alert (counter: 1)
//    //Session.set("counter", Session.get("counter") + 1);
//
//    // The autorun function runs and alerts "counter reached two"
//    //Session.set("counter", Session.get("counter") + 1);
//
//    // The autorun function no longer runs (counter: 3)
//    //Session.set("counter", Session.get("counter") + 1);
//
//    // In a JS file that's loaded on the client and the server
//    Posts = new Mongo.Collection("posts");
//    Comments = new Mongo.Collection("comments");
//
//    //var post = Posts.findOne(1);
//    //
//    //var post = Posts.findOne({
//    //    createdBy: "12345",
//    //    title: {$regex: /first/}
//    //});
//    //console.info(Posts.find());
//    //console.info(post);
//
//
//    // get an array of posts
//    //var postsArray = Posts.findOne(1);
//    //console.info(postsArray);
//    //console.info('teste 1');
//    //console.info(Posts);
//
//    //Posts = new Mongo.Collection("posts");
//    Template.blog.helpers({
//        teste: 'teste',
//        posts: function () {
//            // this helper returns a cursor of
//            // all of the posts in the collection
//            //console.info(Posts.find({title: {$regex: /first/}}).fetch());
//            return Posts.find();
//        }
//    });
//}
//
//
