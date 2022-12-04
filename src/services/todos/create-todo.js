import { getDB, saveDB } from '../../utils/db/index.js';
import { v4 } from 'uuid';

export const createTodo = async (request, reply) => {
  const { body, username } = request;
  const { title, description, isDone = false } = body;
  const db = await getDB();

  const id = v4();

  if (!username) {
    return reply.badRequest();
  }

  const todo = {
    title,
    description,
    isDone,
    username,
    createdDate: new Date().getTime(),
    updatedDate: new Date().getTime()
  };

  db.todos[id] = todo;

  await saveDB(db);

  return {
    id,
    ...todo
  };
};
