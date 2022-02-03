/**
 * This handles the Notification routes declaration in the application
 * @module ROUTES:Notification
 */

const { NODE_ENV } = process.env;

const router = require('express').Router();

const { Logger } = require('../utilities/logger');
const NotificationService = require('../services/notification/notification');
const { checkAuthenticated } = require('../middlewares/http');

const notificationService = new NotificationService();

try {
    router
        .post('/', [checkAuthenticated], async (request, response, next) => {
            request.payload = await notificationService.createNotification({ request, next });
            next();
        })
        .post('/mail', [checkAuthenticated], async (request, response, next) => {
            request.payload = await notificationService.sendMail({ request, next });
            next();
        })
        .post('/mobile-text', [checkAuthenticated], async (request, response, next) => {
            request.payload = await notificationService.sendMobile({ request, next });
            next();
        })
        .post('/template', async (request, response, next) => {
            request.payload = await notificationService.createTemplate({ request, next });
            next();
        })
        .delete('/template/:type', async (request, response, next) => {
            request.payload = await notificationService.deleteTemplate({ request, next });
            next();
        })
        .get('/', [checkAuthenticated], async (request, response, next) => {
            request.payload = await notificationService.readNotification({ request, next });
            next();
        });
} catch (e) {
    const currentRoute = '[Route Error] /notification';
    if (verifyDevelopmentEnvironment) {
        console.log(`${currentRoute}: ${e.message}`);
    } else {
        Logger.error(`${currentRoute}: ${e.message}`);
    }
} finally {
    module.exports = router;
}
