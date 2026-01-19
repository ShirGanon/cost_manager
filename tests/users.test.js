// Users service tests
const { client } = require('./api_client');

// Integration tests for users-service
describe('users-service endpoints', () => {
  test('POST /api/add adds a user', async () => {
    // Test POST user creation
    const res = await client('users')
      .post('/api/add')
      .send({
        id: 123123,
        first_name: 'mosh',
        last_name: 'israeli',
        birthday: '1990-01-01'
      })
      .expect(200);

    // Validate user identity in response
    expect(res.body).toHaveProperty('id', 123123);
    expect(res.body).toHaveProperty('first_name', 'mosh');
    expect(res.body).toHaveProperty('last_name', 'israeli');
    expect(res.body).toHaveProperty('birthday');
  });

  test('GET /api/users returns array', async () => {
    // Seed database for user list test
    await client('users')
      .post('/api/add')
      .send({ id: 123123, first_name: 'mosh', last_name: 'israeli', birthday: '1990-01-01' })
      .expect(200);

    // Test GET users and validate structure
    const res = await client('users')
      .get('/api/users')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].id).toBe(123123);
  });

  test('GET /api/users/:id returns user details with total', async () => {
    // Persist user to test database
    await client('users')
      .post('/api/add')
      .send({ id: 123123, first_name: 'mosh', last_name: 'israeli', birthday: '1990-01-01' })
      .expect(200);

    // Test GET user by ID and aggregation
    const res = await client('users')
      .get('/api/users/123123')
      .expect(200);

    expect(res.body).toHaveProperty('id', 123123);
    expect(res.body).toHaveProperty('first_name', 'mosh');
    /// Validate total costs field and type
    expect(res.body).toHaveProperty('last_name', 'israeli');
    expect(res.body).toHaveProperty('total');

    // Fallback: total costs should be 0
    expect(typeof res.body.total).toBe('number');
  });

  test('POST /api/add rejects invalid payload (missing required fields)', async () => {
    const res = await client('users')
      .post('/api/add')
      .send({ id: 1, first_name: 'mosh' })
      .expect(400);

    // Error message contract
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('message');
  });
});
