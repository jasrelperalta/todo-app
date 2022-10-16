import Fastify from 'fastify';
import sensible from '@fastify/sensible';
import { general } from './services/general/index.js';
import { createTodo } from './services/todos/create-todo.js';
import { deleteTodo } from './services/todos/delete-todo.js';
import { getManyTodo } from './services/todos/get-many-todo.js';
import { getTodo } from './services/todos/get-todo.js';
import { updateTodo } from './services/todos/update-todo.js';

const prefix = '/api';

export async function build () {
  // initialize fastify
  const fastify = Fastify({ logger: true });
  fastify.register(sensible);

  fastify.get(prefix, general);

  // create todo
  fastify.post(`${prefix}/todo`, createTodo);

  // get many todo
  fastify.get(`${prefix}/todo`, getManyTodo);

  // get one todo
  fastify.get(`${prefix}/todo/:todoId`, getTodo);

  // update todo
  fastify.put(`${prefix}/todo/:todoId`, updateTodo);

  // delete a todo
  fastify.delete(`${prefix}/todo/:todoId`, deleteTodo);

  return fastify;
}
