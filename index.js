/**
 * This serves as the template root file and application entry-point.
 * It declares the required items into the global scope and runs necessary aspects of the codebase as required.
 * @module Index
 */

const { PORT, APP_NAME } = process.env;
try {
    const expressMongoSanitize = require('express-mongo-sanitize');
    const compression = require('compression');
    const express = require('express');
    const helmet = require('helmet');
    const cors = require('cors');
    const hpp = require('hpp');
    const httpServer = require('http');

    /** Non-global Utilities */
    const { connectToDatabase, loadModels } = require('./src/models/_config');
    const { morganRequestMiddleware, Logger } = require('./src/utilities/logger');
    const { loadEventSystem } = require('./src/events/_loader');
    const { deleteNotifications } = require('./src/utilities/cronJob');

    const app = express();
    connectToDatabase();
    loadEventSystem();
    loadModels();
    deleteNotifications({
        interval: {
            minute: 1,
        },
    });

    /** Global Utilities */
    require('./src/utilities/globals');

    /** Middleware Applications */
    app.use(express.urlencoded({ limit: '10mb', extended: true }));
    app.use(express.json({ limit: '10mb' }));
    app.use(morganRequestMiddleware);
    app.use(expressMongoSanitize());
    app.use(compression());
    app.use(helmet());
    app.use(cors());
    app.use(hpp());

    /** Route Middleware */
    app.use('/', require('./src/routes/_config'));

    const http = httpServer.createServer(app);

    /** Socket Initialization */
    require('./src/utilities/socket')({ http });

    /** Starting Server */
    http.listen(PORT, () => {
        if (verifyDevelopmentEnvironment) {
            console.log(`🔥 Development Server is running at http://localhost:${PORT}`);
        } else {
            const successMessage = `😃 ${APP_NAME} is LIVE on port ${PORT}`;
            console.log(successMessage);
            Logger.info(successMessage);
        }
    });
} catch (e) {
    console.log(e);
}
