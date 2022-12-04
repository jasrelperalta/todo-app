import tap from 'tap';
import { build } from '../../../src/app.js';
import 'must/register.js';
import Chance from 'chance';

const chance = new Chance();

tap.mochaGlobals();

const prefix = '/api';

describe('Get many todo should work', async () => {
  let app;

  before(async () => {
    app = await build({
      forceCloseConnections: true
    });
  });

  const newUser = {
    username: chance.email({ domain: ' example.com' }),
    password: chance.string({ legnth: 12 }),
    firstName: chance.first(),
    lastName: chance.last()

  };

  let cookie = '';

  it('should return the user that was created with a new user', async () => {
    const response = await app.inject({
      method: 'POST',
      url: `${prefix}/register`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });

    // checks is status code = 200
    response.statusCode.must.be.equal(200);
    const result = await response.json();

    result.username.must.be.equal(newUser.username);
    result.firstName.must.be.equal(newUser.firstName);
    result.lastName.must.be.equal(newUser.lastName);

    // expect dates are not null
    result.createdDate.must.not.be.null();
    result.updatedDate.must.not.be.null();
  });

  it('Login should work', async () => {
    const response = await app.inject({
      method: 'POST',
      url: `${prefix}/login`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: newUser.username,
        password: newUser.password
      })
    });

    // checks is status code = 200
    response.statusCode.must.be.equal(200);

    cookie = response.headers['set-cookie'];
  });

  it('Should return a list of objects with default limit', async () => {
    const response = await app.inject({
      method: 'GET',
      headers: {
        cookie
      },
      url: `${prefix}/todo`
    });

    // checks is status code = 200
    response.statusCode.must.be.equal(200);
    const result = await response.json();

    // expect that id exists
    result.length.must.not.be.above(5);
  });

  it('Should return a list of objects with default limit', async () => {
    const response = await app.inject({
      method: 'GET',
      headers: {
        cookie
      },
      url: `${prefix}/todo?limit=2`
    });

    // checks is status code = 200
    response.statusCode.must.be.equal(200);
    const result = await response.json();

    // expect that id exists
    result.length.must.not.be.above(2);
  });

  after(async () => {
    await app.close();
  });
});
