const nodemailer = require('nodemailer');
var sendEmail = function(req, res) {
    'use strict';
    var contact = req.body;

    res.send(JSON.stringify({status:'200'}));
    return;

    //TODO: add the smtp server for sending the emails 
    //TODO: remove return statement from above

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {

        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: '',
                pass: ''
            }
           });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: `${contact.mail}`, // sender address
            to: 'alexandruamugea@gmail.com', // list of receivers
            subject: 'Buroka contact', // Subject line
            text: `Name: ${contact.name} Email: ${contact.mail} Message: ${contact.text}`, // plain text body
            html: `Name: ${contact.name} Email: ${contact.mail} Message: ${contact.text}`
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.send(JSON.stringify({status:'400', er: error}));
            }
            res.send(JSON.stringify({status:'200'}));
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    });
}

module.exports = sendEmail;