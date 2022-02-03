/**
 * This handles all the required Express router configuration for the application.
 * @module ROUTES:Config
 */
const swaggerUI = require('swagger-ui-express');
const router = require('express').Router();
const {
    handle404,
    handleError,
    setupRequest,
    processResponse,
    checkAuthenticated,
} = require('../middlewares/http');

/** Models Route Handlers */
const notificationRouteHandler = require('./notification');
const logsRouterHandler = require('./externalLogger');
const apiDocs = require('../utilities/api-docs');

/** Cross Origin Handling */

router.use(setupRequest);

router.use('/api', notificationRouteHandler);
router.use(processResponse);

/** Static Routes */
router.use('/image/:imageName', () => {});
/** Query Logs */
router.use('/external-logs', logsRouterHandler);

/* API documentation */
router.use('/', swaggerUI.serve, swaggerUI.setup(apiDocs));

router.use(handle404);
router.use(handleError);

module.exports = router;
