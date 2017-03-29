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



        // smtp = {
        //     // username: 'ruy',   // eg: server@gentlenode.com
        //     // password: 'ruy-1478953',   // eg: 3eeP1gtizk5eziohfervU
        //     username: 'ruyjfs@gmail.com',   // eg: server@gentlenode.com
        //     password: 'ryu-1478953',   // eg: 3eeP1gtizk5eziohfervU
        //     // server:   'smtp.zoho.com',  // eg: mail.gandi.net
        //     server:   'smtp-relay.gmail.com',  // eg: mail.gandi.net
        //     port: 25
        // };
        //
        // process.env.MAIL_URL = 'smtp://' +
        //     encodeURIComponent(smtp.username) + ':' +
        //     encodeURIComponent(smtp.password) + '@' +
        //     encodeURIComponent(smtp.server) + ':' +
        //     smtp.port;


        process.env.MAIL_URL = 'smtp://ruyjfs%40gmail.com:ryu-1478953@smtp.gmail.com:587';
});
}