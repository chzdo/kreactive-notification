/**
 * This module handles the globalization of all objects.
 * This ensures they are properly instantiated into the Global namespace.
 * @module UTILITY:CustomGlobalization
 */

const { NODE_ENV } = process.env;

const mongoose = require('mongoose');

const Controller = require('../controllers/index');
const helpers = require('./helpers');
const {
    CustomControllerError,
    CustomValidationError,
    CustomNotAuthenticatedError,
    CustomNotAuthorizedError,
} = require('./customErrors');

/**
 * This handles the globalization of all the mongoose models.
 * This ensures they are properly instantiated into the Global namespace.
 *
 */
const models = mongoose.modelNames();
for (let i = 0; i < models.length; i++) {
    global[models[i] + 'Controller'] = new Controller(models[i]);
}

/**
 * Custom Error Object globalization
 */
global.CustomValidationError = CustomValidationError;
global.CustomControllerError = CustomControllerError;
global.CustomNotAuthenticatedError = CustomNotAuthenticatedError;
global.CustomNotAuthorizedError = CustomNotAuthorizedError;
/**
 * Custom Error Object globalization
 */
global.ApiCall = helpers.callApi;

global.getTemplate = helpers.getTemplate;
/**
 * Globalizing application environment verification
 */
global.verifyDevelopmentEnvironment = NODE_ENV === 'development' ? true : false;
global.verifyProductionEnvironment = NODE_ENV === 'production' ? true : false;
