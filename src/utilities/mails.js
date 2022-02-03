const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID);

async function sendMail(msg) {
    try {
        return await sgMail.send(msg);
    } catch (e) {
        return e.response.body.errors;
    }
}

module.exports = sendMail;
