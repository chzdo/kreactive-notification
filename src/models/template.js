/**
 * This handles all the required configuration for the Notification model.
 * @module MODELS:Template
 */

const { model, Schema } = require('mongoose');

const TemplateSchema = new Schema({
    // Model Required fields
    id: {
        type: Number,
        required: true,
        unique: true,
        default: 0,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    timeStamp: {
        type: Number,
        required: true,
        default: () => Date.now(),
    },
    createdOn: {
        type: Date,
        required: true,
        default: () => new Date(),
    },
    updatedOn: {
        type: Date,
        required: true,
        default: () => new Date(),
    },
    // Custom Fields
    subject: {
        type: String,
        required: true,
    },
    template: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
});

model('Templates', TemplateSchema);
