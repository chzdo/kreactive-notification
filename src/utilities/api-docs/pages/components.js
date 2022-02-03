module.exports = {
    components: {
        securitySchemes: {
            JWT: {
                description: '',
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
            },
        },

        schemas: {
            createNotification: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        description: 'Notification Message',
                        example: 'Hello, Hi there',
                        required: true,
                    },
                    data: {
                        type: 'object',
                        description:
                            'contains fields to be used for placeholders: N/B only to be used if sendEmail is true',
                        example: {
                            name: 'K8s',
                        },
                        optional: true,
                    },
                    emails: {
                        type: 'array',
                        description: 'Array of email Address to recieve notification',
                        example: ['test@test.com'],
                        optional: true,
                    },
                    type: {
                        type: 'string',
                        required: true,
                        example: 'SIGN_UP',
                        description: 'type of of notification',
                    },
                    sendEmail: {
                        type: 'boolean',
                        required: true,
                        description: 'it specifies if email should also be sent',
                    },
                },
            },

            sendMail: {
                type: 'object',
                properties: {
                    data: {
                        type: 'object',
                        description:
                            'contains fields to be used for placeholders: N/B only to be used if sendEmail is true',
                        example: {
                            name: 'K8s',
                        },
                        optional: true,
                    },
                    emails: {
                        type: 'array',
                        description: 'Array of email Address to recieve notification',
                        example: ['test@test.com'],
                        optional: true,
                    },
                    type: {
                        type: 'string',
                        required: true,
                        example: 'SIGN_UP',
                        description: 'type of of notification',
                    },
                },
            },

            sendMobile: {
                type: 'object',
                properties: {
                    senderId: {
                        type: 'string',
                        description: 'Sender Id for message',
                        example: 'KREATIVE',
                        required: true,
                    },
                    phoneNumbers: {
                        type: 'array',
                        description: 'Array of phone Numbers to recieve notification',
                        example: ['+2347050704721'],
                        required: true,
                    },
                    message: {
                        type: 'string',
                        required: true,
                        example: 'Hi your code is 4065',
                        description: 'message to be sent',
                    },
                },
            },

            createNotificationSuccessfulResponse: {
                type: 'object',
                properties: {
                    payload: {
                        type: 'object',
                        description: 'successful response of query',
                        example: {
                            id: 19,
                            isActive: true,
                            isDeleted: false,
                            sendEmail: true,
                            emails: [],
                            _id: '61fbfcb3e9677e7e783a0e47',
                            message: 'hello',
                            data: {
                                name: 'test',
                            },
                            type: 'LOGIN',
                            organizationId: '1',
                            creatorId: '1',
                            timeStamp: 1643904179561,
                            createdOn: '2022-02-03T16:02:59.561Z',
                            updatedOn: '2022-02-03T16:02:59.561Z',
                            __v: 0,
                        },
                    },
                    error: {
                        type: 'string',
                        description: 'if error occurs',
                        example: null,
                    },
                    responseType: {
                        type: 'string',
                        description: 'request response type',
                        example: 'application/json',
                    },
                    sendRawResponse: {
                        type: 'boolean',

                        example: false,
                    },
                    status: {
                        type: 'number',
                        description: 'status code',
                        example: 201,
                    },
                },
            },

            sendMailSuccessfulResponse: {
                type: 'object',
                properties: {
                    payload: {
                        type: 'string',
                        description: 'successful response of query',
                        example: 'mail sent',
                    },
                    error: {
                        type: 'string',
                        description: 'if error occurs',
                        example: null,
                    },
                    responseType: {
                        type: 'string',
                        description: 'request response type',
                        example: 'application/json',
                    },
                    sendRawResponse: {
                        type: 'boolean',

                        example: false,
                    },
                    status: {
                        type: 'number',
                        description: 'status code',
                        example: 201,
                    },
                },
            },

            sendMobileSuccessfulResponse: {
                type: 'object',
                properties: {
                    payload: {
                        type: 'string',
                        description: 'successful response of query',
                        example: 'mesage sent',
                    },
                    error: {
                        type: 'string',
                        description: 'if error occurs',
                        example: null,
                    },
                    responseType: {
                        type: 'string',
                        description: 'request response type',
                        example: 'application/json',
                    },
                    sendRawResponse: {
                        type: 'boolean',

                        example: false,
                    },
                    status: {
                        type: 'number',
                        description: 'status code',
                        example: 201,
                    },
                },
            },

            getNotificationSuccessfulResponse: {
                type: 'object',
                properties: {
                    payload: {
                        type: 'array',
                        description: 'successful response of query',
                        example: [
                            {
                                id: 19,
                                isActive: true,
                                isDeleted: false,
                                sendEmail: true,
                                emails: [],
                                _id: '61fbfcb3e9677e7e783a0e47',
                                message: 'hello',
                                data: {
                                    name: 'test',
                                },
                                type: 'LOGIN',
                                organizationId: '1',
                                creatorId: '1',
                                timeStamp: 1643904179561,
                                createdOn: '2022-02-03T16:02:59.561Z',
                                updatedOn: '2022-02-03T16:02:59.561Z',
                                __v: 0,
                            },
                        ],
                    },
                    error: {
                        type: 'string',
                        description: 'if error occurs',
                        example: null,
                    },
                    responseType: {
                        type: 'string',
                        description: 'request response type',
                        example: 'application/json',
                    },
                    sendRawResponse: {
                        type: 'boolean',

                        example: false,
                    },
                    status: {
                        type: 'number',
                        description: 'status code',
                        example: 201,
                    },
                },
            },

            BadRequest: {
                type: 'object',
                properties: {
                    payload: {
                        type: 'null',
                        description: 'payload',
                        example: null,
                    },
                    error: {
                        type: 'string',
                        description: 'error message',
                        example: 'bad request occured',
                    },
                    responseType: {
                        type: 'string',
                        description: 'request response type',
                        example: 'application/json',
                    },
                    sendRawResponse: {
                        type: 'boolean',
                        example: false,
                    },
                    status: {
                        type: 'number',
                        description: 'status code',
                        example: 400,
                    },
                },
            },

            NotAuthenticated: {
                type: 'object',
                properties: {
                    payload: {
                        type: 'null',
                        description: 'payload',
                        example: null,
                    },
                    error: {
                        type: 'string',
                        description: 'error message',
                        example: 'not authenticated',
                    },
                    responseType: {
                        type: 'string',
                        description: 'request response type',
                        example: 'application/json',
                    },
                    sendRawResponse: {
                        type: 'boolean',
                        example: false,
                    },
                    status: {
                        type: 'number',
                        description: 'status code',
                        example: 401,
                    },
                },
            },

            ValidationError: {
                type: 'object',
                properties: {
                    payload: {
                        type: 'null',
                        description: 'payload',
                        example: null,
                    },
                    error: {
                        type: 'string',
                        description: 'error message',
                        example: 'validation Error',
                    },
                    responseType: {
                        type: 'string',
                        description: 'request response type',
                        example: 'application/json',
                    },
                    sendRawResponse: {
                        type: 'boolean',
                        example: false,
                    },
                    status: {
                        type: 'number',
                        description: 'status code',
                        example: 412,
                    },
                },
            },

            ServerError: {
                type: 'object',
                properties: {
                    payload: {
                        type: 'null',
                        description: 'payload',
                        example: null,
                    },
                    error: {
                        type: 'string',
                        description: 'error message',
                        example: 'Server Error',
                    },
                    responseType: {
                        type: 'string',
                        description: 'request response type',
                        example: 'application/json',
                    },
                    sendRawResponse: {
                        type: 'boolean',
                        example: false,
                    },
                    status: {
                        type: 'number',
                        description: 'status code',
                        example: 500,
                    },
                },
            },
        },
    },
};
