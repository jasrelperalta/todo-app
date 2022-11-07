import { paths } from "./paths/index.js"

export const specification = {
  openapi: '3.0.0',
  info: {
    title: 'todo-app',
    version: '1.0.0'
  },
  paths,
  components: {
    schemas: {
      TodoObject: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          title: {
            type: 'string'
          },
          description: {
            type: 'string'
          },
          isDone: {
            type: 'boolean'
          },
          createdDate: {
            type: 'number'
          },
          updatedDate: {
            type: 'number'
          }
        }
      },
      TodoRequestRequiredObject:{
        type: 'object',
        properties: {
          title: {
            type: 'string'
          },
          description: {
            type: 'string'
          },
          isDone: {
            type: 'boolean'
          }
        },
        required: [
          'title',
          'description'
        ]
      }
    }
  }
};
