import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const prefix = '/api';

describe('Getting a todo should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  it('Should return the object given an id', async () => {
    const newTodo = {
      title: 'new Todo for get',
      description: 'new Description'
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    const { id } = await createResponse.json();

    const response = await app.inject({
      method: 'GET',
      url: `${prefix}/todo/${id}`
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
    result.isDone.must.be.false();
    // expect createdDate and updateDate is not null
    result.createdDate.must.not.be.null();
    result.updatedDate.must.not.be.null();
  });
});
