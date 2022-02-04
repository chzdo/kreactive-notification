/**
 *
 * This is the entry-point for all Nodejs Events in the application
 * @module EVENTS:Config
 */
const { FROM } = process.env;
const EventEmitter = require('events');

const { Logger } = require('../utilities/logger');
const sendMail = require('../utilities/mails');

/**
 *
 * This class extends the NodeJS event emitter class and allows for using custom events in the application.
 * @class
 */
class AppEvent extends EventEmitter {}

const appEvent = new AppEvent();

appEvent.on('error', (error) => {
    Logger.error(`[AppEvent Error] ${error}`);
});

appEvent.on('MAIL', async (param) => {
    try {
        let templates = await TemplatesController.readRecords({
            conditions: { isActive: true, type: param.type },
        });

        if (templates && templates.failed) {
            console.log(templates);
            appEvent.emit('error', templates.error);
            return;
        }

        if (!templates.length) {
            appEvent.emit('error', 'templaten not found');
            return;
        }

        [templates] = templates;

        const { template, subject } = templates;

        const messageConfig = {
            to: param.emails,
            from: FROM,
            subject: subject,
            html: getTemplate(template, param.data ? param.data : {}),
        };

        const response = await sendMail(messageConfig);
        console.log({ response });
    } catch (e) {
        console.log(e);
    }
});

module.exports = appEvent;
