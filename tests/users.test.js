const request = require('supertest');

const usersApp = require('../services/users_service/app');

describe('users-service endpoints', () => {
  test('POST /api/add adds a user', async () => {
    const res = await request(usersApp)
      .post('/api/add')
      .send({
        id: 123123,
        first_name: 'mosh',
        last_name: 'israeli',
        birthday: '1990-01-01'
      })
      .expect(200);

    expect(res.body).toHaveProperty('id', 123123);
    expect(res.body).toHaveProperty('first_name', 'mosh');
    expect(res.body).toHaveProperty('last_name', 'israeli');
    expect(res.body).toHaveProperty('birthday');
  });

  test('GET /api/users returns array', async () => {
    await request(usersApp)
      .post('/api/add')
      .send({ id: 123123, first_name: 'mosh', last_name: 'israeli', birthday: '1990-01-01' })
      .expect(200);

    const res = await request(usersApp)
      .get('/api/users')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].id).toBe(123123);
  });

  test('GET /api/users/:id returns user details with total', async () => {
    await request(usersApp)
      .post('/api/add')
      .send({ id: 123123, first_name: 'mosh', last_name: 'israeli', birthday: '1990-01-01' })
      .expect(200);

    const res = await request(usersApp)
      .get('/api/users/123123')
      .expect(200);

    expect(res.body).toHaveProperty('id', 123123);
    expect(res.body).toHaveProperty('first_name', 'mosh');
    expect(res.body).toHaveProperty('last_name', 'israeli');
    expect(res.body).toHaveProperty('total');

    // If you did not implement sum aggregation yet, it should be 0
    expect(typeof res.body.total).toBe('number');
  });
});
