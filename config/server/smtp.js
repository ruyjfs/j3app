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
        process.env.MAIL_URL="smtp://no-reply:Z6n2MFqPefVN@smtp.zoho.com:587";
        // Z6n2MFqPefVN
    });
}