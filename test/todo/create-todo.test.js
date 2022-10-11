import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const prefix = '/api';

describe('Creating a todo should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  it('should return the object that was created with ID with isDone = false without isDone being given', async () => {
    const newTodo = {
      title: 'new Todo',
      description: 'new Description'
    };

    const response = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    // checks is status code = 200
    response.statusCode.must.be.equal(200);
    const result = await response.json();

    // expect that id exists
    result.id.must.not.be.null();

    // expect that all values should be equal to newTodo properties
    result.title.must.be.equal(newTodo.title);
    result.description.must.be.equal(newTodo.description);
    // expect that isDone is false since not given
    result.isDone.must.be.false();
    // expect createdDate and updateDate is not null
    result.createdDate.must.not.be.null();
    result.updatedDate.must.not.be.null();
  });

  it('should return the object that was created with ID with isDone = given object', async () => {
    const newTodo = {
      title: 'new Todo 2',
      description: 'new Description 2',
      isDone: true
    };

    const response = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    // checks is status code = 200
    response.statusCode.must.be.equal(200);
    const result = await response.json();

    // expect that id exists
    result.id.must.not.be.null();

    // expect that all values should be equal to newTodo properties
    result.title.must.be.equal(newTodo.title);
    result.description.must.be.equal(newTodo.description);
    // expect that isDone is false since not given
    result.isDone.must.be.equal(newTodo.isDone);
    // expect createdDate and updateDate is not null
    result.createdDate.must.not.be.null();
    result.updatedDate.must.not.be.null();
  });
});
