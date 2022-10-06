import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

describe('/api should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  it('should return {success: true}', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api'
    });

    // checks is status code = 200
    response.statusCode.must.be.equal(200);
    const result = await response.json();

    // checks if { success } = true
    result.success.must.be.true();
  });
});
