if (Meteor.isServer) {
    Meteor.startup(function () {
        //process.env.MAIL_URL = 'smtp://your_username:your_password@smtp.sendgrid.net:587';
        // process.env.MAIL_URL="smtp://ruyjfs:ryu-1478953@smtp.gmail.com:587";
        // process.env.MAIL_URL="smtp://no-reply:j3scrumno-reply@smtp.zoho.com:465";
        // process.env.MAIL_URL="smtp://no-reply:j3scrumno-reply@j3scrum.com:465";
        // process.env.MAIL_URL="smtp://no-reply:j3scrumno-reply@j3scrum.com:587";
        // process.env.MAIL_URL="smtp://no-reply:Z6n2MFqPefVN@j3scrum.com:587";
        // process.env.MAIL_URL="smtp://no-reply:j3scrumno-reply@smtp.zoho.com:465";
        // process.env.MAIL_URL="smtp://no-reply:Z6n2MFqPefVN@mx.zohomail.com:25";
        // process.env.MAIL_URL="smtp://no-reply:j3scrumno-reply@smtp.zoho.com:25";
        // process.env.MAIL_URL="smtp://no-reply:Z6n2MFqPefVN@smtp.zoho.com:587";
        // process.env.MAIL_URL="smtp://no-reply:Z6n2MFqPefVN@smtp.zoho.com:587";
        // process.env.MAIL_URL="smtp://no-reply:j3scrumno-reply@smtp.zoho.com:587";
        // process.env.MAIL_URL="smtp://no-reply:j3scrumno-reply@smtp.zoho.com:465";
        // process.env.MAIL_URL="smtp://ruy:Ruyjr-1478953@smtp.zoho.com:465";
        // Z6n2MFqPefVN

        // Accounts.emailTemplates.resetPassword.text = function(user, url){
        //     url = url.replace('#/', '');
        //     return "Click this link to reset your password: " + url;
        // };



        Accounts.emailTemplates.siteName = "j3scrum";
        Accounts.emailTemplates.from = "j3scrum <no-reply@j3scrum.com>";
        // Accounts.emailTemplates.resetPassword.from = function (user, url) {
        //     return "You have been selected to participate in building a better future!"
        //         + " To activate your account, simply click the link below:\n\n"
        //         + url;
        // };
        // Accounts.emailTemplates.resetPassword.text = function(user, url){
        //     var token = url.substring(url.lastIndexOf('/')+1, url.length);
        //     var newUrl = Meteor.absoluteUrl('reset/' + token);
        //     var str = 'Hi,\n';
        //     str+= 'To reset your password, please click follow link...\n';
        //     str+= newUrl;
        //     return str;
        // };

        smtp = {
            // username: 'no-reply@j3scrum.com',
            // password: 'j3scrumno-reply',
            // server:   'smtp.zoho.com',
            // port: 587
            username: 'no-reply@j3rotherhood.com',
            password: 'j3no-reply',
            server:   'smtp-relay.gmail.com',
            port: 25
        };

        process.env.MAIL_URL = 'smtp://' +
            encodeURIComponent(smtp.username) + ':' +
            encodeURIComponent(smtp.password) + '@' +
            encodeURIComponent(smtp.server) + ':' +
            smtp.port;


        // process.env.MAIL_URL = 'smtp://ruyjfs%40gmail.com:ryu-1478953@smtp.gmail.com:587';
        // process.env.MAIL_URL = 'smtp://no-reply%40j3rotherhood.com:j3no-reply@smtp-relay.gmail.com:25';
        // process.env.MAIL_URL = 'smtp://no-reply%40j3scrum.com:j3scrumno-reply@smtp.zoho.com:25';
});
}