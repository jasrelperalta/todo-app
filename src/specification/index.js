import { paths } from './paths/index.js';
import { components } from './components/index.js';
export const specification = {
  openapi: '3.0.0',
  info: {
    title: 'todo-app',
    version: '1.0.0'
  },
  paths,
  components
};
