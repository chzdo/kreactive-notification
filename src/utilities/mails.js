const sgMail = require('@sendgrid/mail');
const replaceTags = require("./template.js");
const templateManager = require("./templateManager.js");
const { FROM , isProd , testEmails} = process.env;
sgMail.setApiKey(process.env.SENDGRID);
class EmailUtils {
    //this is for sending emails using nodemail
    async sendMail({ to, from = FROM, subject, cc, tags, template }) {
        const { subject: subjectTemplate, body } = await templateManager.get(template);
        subject = subject || subjectTemplate;
      
        const finalTags = { ...tags };
        console.log(tags, replaceTags(body, finalTags))
        try {
        const response =  await sgMail.send(    {
                from,
                to: isProd ? to : testEmails,
                cc,
                subject: replaceTags(subject, finalTags),
                html: replaceTags(body, finalTags)
        });
           return { status: 200 , response : response[0]?.body};

        } catch (ex) {
            console.log(ex.response.body.errors)
              return { status: 400 , error: ex.response ? ex.message: ex.response.body.errors };
        }
    }
}
module.exports =  new EmailUtils();
