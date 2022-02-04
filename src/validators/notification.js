/**
 * Handles the implementation of Joi package for Notification service validation
 * @module VALIDATOR:Notification
 */

const Joi = require('@hapi/joi');

const createSchema = Joi.object({
    message: Joi.string().required().label('message'),
    data: Joi.when('sendEmail', { is: true, then: Joi.object().required() }),
    emails: Joi.when('sendEmail', {
        is: true,
        then: Joi.array().items(Joi.string().email()).min(1).required(),
    }),
    sendEmail: Joi.bool().required(),
    type: Joi.string().required(),
});

const typeSchema = Joi.object({
    type: Joi.string().required().label('type'),
    data: Joi.object().required(),
    emails: Joi.array().items(Joi.string().email()).required(),
});

const templateSchema = Joi.object({
    subject: Joi.string().required().label('Subject'),
    template: Joi.string().required(),
    type: Joi.string().required(),
});
const mobileSchema = Joi.object({
    senderId: Joi.string().required().label('Sender ID'),
    message: Joi.string().required(),
    phoneNumbers: Joi.array().items(Joi.string()).required(),
});

module.exports = {
    createSchema,
    typeSchema,
    templateSchema,
    mobileSchema,
};
