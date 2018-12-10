var config = require('../config');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.sendgrigKey);

exports.send =  async (to,subject,body) =>{

    const msg = {
        to: to,
        from:'api.restful@gmail.com',
        subject: subject,
        html: body,
      };


      sgMail.send(msg);
}



