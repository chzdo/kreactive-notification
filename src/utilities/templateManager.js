const  fs  = require("fs-extra");
const path  =  require("path");

const subjectRegex = /<title>(.+)<\/title>/;
class EmailTemplateManager {
    templates = {}
    async get(templateName,flag=true) {
        let template = this.templates[templateName];
        if (!template) {
            const source = await fs.readFile(path.resolve( flag? `./emailTemplates/${templateName}.html` : `./mobileTemplates/${templateName}.txt`), "utf8");
            const subject = flag? subjectRegex.exec(source)[1] : "";
            const body = source.replace(subjectRegex, "");
            template = { subject, body };
            this.templates[templateName] = template;
        }
        return template;
    }


}

module.exports = new EmailTemplateManager();