module.exports = {
    get: {
        tags: ['Notification Model'],
        description: 'Get all notification',
        security: [{ JWT: [] }],
        operationId: 'getNotification',
        parameters: [],
        responses: {
            202: {
                description: 'Notification Saved and returned',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/getNotificationSuccessfulResponse',
                        },
                    },
                },
            },

            401: {
                description: 'Not Authenticated',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/NotAuthenticated',
                        },
                    },
                },
            },
            412: {
                description: 'Validation Error',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ValidationError',
                        },
                    },
                },
            },
            500: {
                description: 'Server error',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ServerError',
                        },
                    },
                },
            },
        },
    },
};
