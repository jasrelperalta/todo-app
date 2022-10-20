export const specification = {
    openapi: '3.0.0',
    info: {
        title: 'todo-app-cmsc100',
        version: '1.0.0'
    },
    paths: {
        '/': {
            get: {
                summary: 'API General Example',
                responses: {
                    200: {
                        description: 'successful response',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};