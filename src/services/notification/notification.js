/**
 *
 * This handles the business logic for the Notification Model
 * @module SERVICE:Notification
 */


const RootService = require('../_root');
const { buildQuery, buildWildcardOptions } = require('../../utilities/query');
const {
    createSchema,
    typeSchema,
    templateSchema,
    mobileSchema,
    createBulkSchema,
} = require('../../validators/notification');
const appEvent = require('../../events/_config');
const replaceTags = require('../../utilities/template');

/**
 *
 * This is the integration of the Notification model routes with the Notification model controller bridging by holding core business logic.
 * @class
 */
class NotificationService extends RootService {
    constructor() {
        super();
        this.notificationController = NotificationController;
        this.serviceName = 'NotificationService';
    }

    /**
     *
     * @typedef RequestFunctionParameter
     * @property {object} request Express Request parameter
     * @property {function} next Express NextFunction parameter
     */

    /**
     *
     * This method is an implementation to handle the business logic of Creating and saving new records into the database.
     * This should be used alongside a POST Request alone.
     * @async
     * @method
     * @param {RequestFunctionParameter} {@link RequestFunctionParameter}
     * @returns {object<processSingleRead|processedError>}
     */
    async createNotification({ request, next }) {
        try {
            let { body, user } = request;
    
            if (!user) {
                throw new CustomNotAuthenticatedError('not authenticated');
            }
            const { error } = createSchema.validate(body);
            if (error) throw new CustomValidationError(this.filterJOIValidation(error.message));
            body = { ...body, organizationId: user.organizationId, creatorId: user.currentUserId, };
            const result = await this.notificationController.createRecord(body);
            if (result && result.failed) throw new CustomControllerError(result.error);
            socketServer.to(`room-${result.organizationId}`).emit('NEW_NOTIFICATION', replaceTags(result.message, result.data));
            if (result.sendEmail) {
                appEvent.emit('MAIL', result);
            }
            return this.processSuccessfulResponse({ payload: result, code: 202 });
        } catch (e) {
            let processedError = this.formatError({
                service: this.serviceName,
                error: e,
                functionName: 'createNotification',
            });
            return next(processedError);
        }
    }



       /**
     *
     * This method is an implementation to handle the business logic of Creating and saving new records into the database.
     * This should be used alongside a POST Request alone.
     * @async
     * @method
     * @param {RequestFunctionParameter} {@link RequestFunctionParameter}
     * @returns {object<processSingleRead|processedError>}
     */
        async createBulkNotification({ request, next }) {
            try {
                let { body} = request;
        
                const { error } = createBulkSchema.validate(body);
                if (error) throw new CustomValidationError(this.filterJOIValidation(error.message));

                const recipients = body.data;
                let dataToSave = []
                for (let recipient of recipients) {
                    dataToSave.push({
                        ...body,
                        data: recipient,
                        organizationId: recipient.organizationId,
                        creatorId: "system",
                        emails:[recipient.organizationEmail]
                    })
                }
                const result = await this.notificationController.createManyRecord(dataToSave);
                if (result && result.failed) throw new CustomControllerError(result.error);
                for (let res of result) {
                   
                    socketServer.to(`room-${res.organizationId}`).emit('NEW_NOTIFICATION',  replaceTags(res.message, res.data));
                    if (res.sendEmail) {
                        appEvent.emit('MAIL', res);
                    }
                }         
            
                return this.processSuccessfulResponse({payload:{msg:"accepted"},code:202})
            } catch (e) {
                let processedError = this.formatError({
                    service: this.serviceName,
                    error: e,
                    functionName: 'createNotification',
                });
                return next(processedError);
            }
        }
    /**
     *
     * @typedef RequestFunctionParameter
     * @property {object} request Express Request parameter
     * @property {function} next Express NextFunction parameter
     */

    /**
     *
     * This method is an implementation to handle the business logic of Creating and saving new records into the database.
     * This should be used alongside a POST Request alone.
     * @async
     * @method
     * @param {RequestFunctionParameter} {@link RequestFunctionParameter}
     * @returns {object<processSingleRead|processedError>}
     */
    async sendMail({ request, next }) {
        try {
            let { body } = request;

            const { error } = typeSchema.validate(body);

            if (error) throw new CustomValidationError(this.filterJOIValidation(error.message));

            appEvent.emit('MAIL', body);

            return this.processSuccessfulResponse({ payload: 'mail sent', code: 202 });
        } catch (e) {
            let processedError = this.formatError({
                service: this.serviceName,
                error: e,
                functionName: 'sendMail',
            });

            return next(processedError);
        }
    }

    /**
     *
     * This method is an implementation to handle the business logic of Creating and saving new records into the database.
     * This should be used alongside a POST Request alone.
     * @async
     * @method
     * @param {RequestFunctionParameter} {@link RequestFunctionParameter}
     * @returns {object<processSingleRead|processedError>}
     */
    async sendMobile({ request, next }) {
        try {
            const { body } = request;
            const { error } = mobileSchema.validate(body);
            if (error) throw new CustomValidationError(this.filterJOIValidation(error.message));
            appEvent.emit('MESSAGE', { body, authorization: request.headers.authorization}); 
            return this.processSuccessfulResponse({ payload: 'message sent ', code: 202 });
        } catch (e) {
            let processedError = this.formatError({
                service: this.serviceName,
                error: e,
                functionName: 'sendMobile',
            });
            return next(processedError);
        }
    }

    /**
     *
     * This method is an implementation to handle the business logic of Creating and saving new records into the database.
     * This should be used alongside a POST Request alone.
     * @async
     * @method
     * @param {RequestFunctionParameter} {@link RequestFunctionParameter}
     * @returns {object<processSingleRead|processedError>}
     */
    async createTemplate({ request, next }) {
        try {
            const { body, user } = request;

            const { error } = templateSchema.validate(body);
            if (error) throw new CustomValidationError(this.filterJOIValidation(error.message));
            let result = await TemplatesController.readRecords({
                conditions: { type: body.type, isActive: true },
                count: true,
            });
            if (result && result.failed) throw new CustomControllerError(result.error);
            if (result.count) {
                throw new Error('template already exist');
            }
            result = await TemplatesController.createRecord({ ...body });
            if (result && result.failed) throw new CustomControllerError(result.error);
            return this.processSingleRead(result);
        } catch (e) {
            let processedError = this.formatError({
                service: this.serviceName,
                error: e,
                functionName: 'createTemplate',
            });

            return next(processedError);
        }
    }

    /**
     *
     * This method is an implementation to handle the business logic of Creating and saving new records into the database.
     * This should be used alongside a POST Request alone.
     * @async
     * @method
     * @param {RequestFunctionParameter} {@link RequestFunctionParameter}
     * @returns {object<processSingleRead|processedError>}
     */
    async deleteTemplate({ request, next }) {
        try {
            const { params } = request;

            const { type } = params;

            if (!type) throw new CustomValidationError('invalid type');

            const result = await TemplatesController.deleteRecords({ isActive: true, type });

            if (result && result.failed) throw new CustomControllerError(result.error);

            return this.processDeleteResult(result);
        } catch (e) {
            let processedError = this.formatError({
                service: this.serviceName,
                error: e,
                functionName: 'createTemplate',
            });

            return next(processedError);
        }
    }

    /**
     * This method is an implementation to handle the business logic of Reading existing records from the database without filter.
     * This should be used alongside a GET Request alone.
     * @async
     * @method
     * @param {RequestFunctionParameter} {@link RequestFunctionParameter}
     * @returns {object<processSingleRead|processedError>}
     */
    async readNotification({ request, next }) {
        try {
            const { user, query } = request;

            if (!user) {
                throw new CustomNotAuthorizedError('not authenticated');
            }

            const { limit, skip } = buildQuery(query);

            const result = await this.notificationController.readRecords({
                conditions: { organizationId: user.organizationId, isActive: true },
                limit,
                skip,
            });
            if (result && result.failed) throw new CustomControllerError(result.error);

            return this.processMultipleReadResults(result);
        } catch (e) {
            let processedError = this.formatError({
                service: this.serviceName,
                error: e,
                functionName: 'readNotification',
            });

            return next(processedError);
        }
    }
}

module.exports = NotificationService;
