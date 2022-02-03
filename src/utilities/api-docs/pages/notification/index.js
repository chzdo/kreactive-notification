const sendMail = require('./send-mail');
const sendMobile = require('./send-mobile');
const createNotification = require('./create-notification');
const getNotification = require('./get-notification');
module.exports = {
    paths: {
        '/api/': {
            ...createNotification,
            ...getNotification,
        },
        '/api/mail': {
            ...sendMail,
        },
        '/api/mobile-text': {
            ...sendMobile,
        },
    },
};
