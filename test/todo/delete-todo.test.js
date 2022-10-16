import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const prefix = '/api';

describe('Deleting a todo should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  it('Should return success = true if ID is deleted', async () => {
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
      method: 'DELETE',
      url: `${prefix}/todo/${id}`
    });

    // checks is status code = 200
    response.statusCode.must.be.equal(200);
    const result = await response.json();

    // expect success = true
    result.success.must.be.true();

    const getResponse = await app.inject({
      method: 'GET',
      url: `${prefix}/todo/${id}`
    });

    getResponse.statusCode.must.be.equal(404);
  });
});
