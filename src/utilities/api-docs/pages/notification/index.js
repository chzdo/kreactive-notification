const sendMail = require('./send-mail');
const sendMobile = require('./send-mobile');
const createNotification = require('./create-notification');
const getNotification = require('./get-notification');
module.exports = {
    paths: {
        '/': {
            ...createNotification,
            ...getNotification,
        },
        '/mail': {
            ...sendMail,
        },
        '/mobile-text': {
            ...sendMobile,
        },
    },
};
