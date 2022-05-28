/**
 *
 * This is the entry-point for all Nodejs Events in the application
 * @module EVENTS:Config
 */
const EventEmitter = require('events');
const { Logger } = require('../utilities/logger');
const emailUtils = require('../utilities/mails');
const replaceTags = require('../utilities/template');
const templateManager = require('../utilities/templateManager');
const { SEND_TEXT_URL } = process.env;

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
    console.log(param)
    const response = await emailUtils.sendMail({
            to: param.emails,
            tags: param.data,
            template: param.type
        });
    if (response.status === 200) {
        Logger.info({ msg: "email message sent successfully" });
    } else {
        appEvent.emit("error", response.error);
    }
});

appEvent.on("MESSAGE", async ({ body, authorization }) => {
    const template = await templateManager.get(body.type, false)
    body.message = replaceTags(template.body, body.data);
    delete body.data;
    delete body.type;
    ApiCall({
        url: SEND_TEXT_URL,
        method: 'POST',
        headers: {
            authorization: authorization || "",
        },
        data: body,
    });
})

module.exports = appEvent;
