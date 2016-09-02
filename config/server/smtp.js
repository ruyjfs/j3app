if (Meteor.isServer) {
    Meteor.startup(function () {
        //process.env.MAIL_URL = 'smtp://your_username:your_password@smtp.sendgrid.net:587';
        //process.env.MAIL_URL="smtp://ruyjfs:ryu-1478953@smtp.gmail.com:587";
    });
}