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
/* API documentation */
router.use('/docs/api-docs', swaggerUI.serve, swaggerUI.setup(apiDocs));
/** Query Logs */
router.use('/external-logs', logsRouterHandler);

router.use('/', notificationRouteHandler);
router.use(processResponse);

/** Static Routes */
router.use('/image/:imageName', () => {});

router.use(handle404);
router.use(handleError);

module.exports = router;
