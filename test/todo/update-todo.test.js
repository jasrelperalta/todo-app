import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const prefix = '/api';

describe('Update a todo should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  it('Should update the object given an id, title, desc, and isdone', async () => {
    const newTodo = {
      title: 'new Todo for get',
      description: 'new Description'
    };

    const newerTodo = {
      title: 'new Todo for update',
      description: 'new Description 2',
      isDone: true
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    const { id, createdDate, updatedDate } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/todo/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newerTodo)
    });

    // checks is status code = 200
    response.statusCode.must.be.equal(200);
    const result = await response.json();

    // expect that id exists
    result.id.must.equal(id);

    // expect that all values should be equal to newTodo properties
    result.title.must.be.equal(newerTodo.title);
    result.description.must.be.equal(newerTodo.description);
    // expect that isDone is false since not given
    result.isDone.must.be.equal(newerTodo.isDone);
    // expect createdDate and updateDate is not null
    result.createdDate.must.equal(createdDate);
    result.updatedDate.must.above(updatedDate);
  });
  it('Should update the object given an ID and isdone is updated', async () => {
    const newTodo = {
      title: 'new Todo for get',
      description: 'new Description'
    };

    const newerTodo = {
      isDone: true
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    const { id, createdDate, updatedDate } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/todo/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newerTodo)
    });

    // checks is status code = 200
    response.statusCode.must.be.equal(200);
    const result = await response.json();

    // expect that id exists
    result.id.must.equal(id);

    // expect that all values should be equal to newTodo properties
    result.title.must.be.equal(newTodo.title);
    result.description.must.be.equal(newTodo.description);
    // expect that isDone is false since not given
    result.isDone.must.be.equal(newerTodo.isDone);
    // expect createdDate and updateDate is not null
    result.createdDate.must.equal(createdDate);
    result.updatedDate.must.above(updatedDate);
  });
  it('Should update the object given an id, where only title is updated', async () => {
    const newTodo = {
      title: 'new Todo for get',
      description: 'new Description'
    };

    const newerTodo = {
      title: 'new Todo for update 2'
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    const { id, createdDate, updatedDate } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/todo/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newerTodo)
    });

    // checks is status code = 200
    response.statusCode.must.be.equal(200);
    const result = await response.json();

    // expect that id exists
    result.id.must.equal(id);

    // expect that all values should be equal to newTodo properties
    result.title.must.be.equal(newerTodo.title);
    result.description.must.be.equal(newTodo.description);
    // expect that isDone is false since not given
    result.isDone.must.be.false();
    // expect createdDate and updateDate is not null
    result.createdDate.must.equal(createdDate);
    result.updatedDate.must.above(updatedDate);
  });
});
