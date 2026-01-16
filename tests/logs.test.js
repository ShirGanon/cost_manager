const request = require('supertest');

const logsApp = require('../services/logs_service/app');

describe('logs-service endpoints', () => {
  test('POST /internal/log ingests a log', async () => {
    const res = await request(logsApp)
      .post('/internal/log')
      .send({
        timestamp: new Date().toISOString(),
        method: 'GET',
        path: '/api/users',
        status: 200,
        service: 'users-service'
      })
      .expect(200);

    expect(res.body).toHaveProperty('ok', true);
  });

  test('GET /api/logs returns logs array', async () => {
    await request(logsApp)
      .post('/internal/log')
      .send({
        timestamp: new Date().toISOString(),
        method: 'GET',
        path: '/api/users',
        status: 200,
        service: 'users-service'
      })
      .expect(200);

    const res = await request(logsApp)
      .get('/api/logs')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
