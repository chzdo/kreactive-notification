module.exports = {
    post: {
        tags: ['Notification Model'],
        description: 'Send Mail',
        operationId: 'sendMail',

        security: [{ JWT: [] }],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/sendMail',
                    },
                },
            },
        },
        responses: {
            202: {
                description: 'Notification Saved and returned',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/sendMailSuccessfulResponse',
                        },
                    },
                },
            },
            401: {
                description: 'Bad Request: ',
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
