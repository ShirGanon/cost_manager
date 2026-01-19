// Logs service tests
const { client } = require('./api_client');

// Integration tests for logs-service
describe('logs-service endpoints', () => {
  test('POST /internal/log ingests a log', async () => {
    // Test POST log ingestion
    const res = await client('logs')
      .post('/internal/log')
      .send({
        timestamp: new Date().toISOString(),
        method: 'GET',
        path: '/api/users',
        // Provide log metadata payload
        status: 200,
        service: 'users-service'
      })
      .expect(200);

    expect(res.body).toHaveProperty('ok', true);
  });

  test('GET /api/logs returns logs array', async () => {
    // Seed database for retrieval test
    await client('logs')
      .post('/internal/log')
      .send({
        timestamp: new Date().toISOString(),
        method: 'GET',
        path: '/api/users',
        // Define ingestion test attributes
        status: 200,
        service: 'users-service'
      })
      .expect(200);

    // Test GET logs success
    const res = await client('logs')
      .get('/api/logs')
      .expect(200);

    // Validate non-empty logs array
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
