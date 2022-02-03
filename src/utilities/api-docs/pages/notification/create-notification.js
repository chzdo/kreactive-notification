module.exports = {
    post: {
        tags: ['Notification Model'],
        description: 'Create a Notification',
        operationId: 'createNotification',
        security: [{ JWT: [] }],

        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/createNotification',
                    },
                },
            },
        },
        responses: {
            201: {
                description: 'Notification Saved and returned',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/createNotificationSuccessfulResponse',
                        },
                    },
                },
            },
            400: {
                description: 'Bad Request: ',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/BadRequest',
                        },
                    },
                },
            },
            401: {
                description: 'No Authenticated',
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
