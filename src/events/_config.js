/**
 *
 * This is the entry-point for all Nodejs Events in the application
 * @module EVENTS:Config
 */

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
        from: 'KREATIVEROCK <no-reply@kreativerock.com>',
        subject: subject,
        html: getTemplate(template, param.data),
    };

    console.log('here', messageConfig);
    const response = await sendMail(messageConfig);
    console.log({ response });
});

module.exports = appEvent;
