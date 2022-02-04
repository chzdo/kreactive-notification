/**
 * This handles all the required configuration for the Notification model.
 * @module MODELS:Notification
 */

const { model, Schema } = require('mongoose');

const NotificationSchema = new Schema({
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
    message: {
        type: String,
        required: true,
    },
    creatorId: {
        type: String,
        required: true,
    },
    organizationId: {
        type: String,
        required: true,
    },
    sendEmail: {
        type: Boolean,
        default: false,
    },
    data: {
        type: Object,
        default: {},
    },
    type: {
        type: String,
    },
    emails: [String],
});

model('Notification', NotificationSchema);
