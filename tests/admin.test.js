// Admin service tests
const { client } = require('./api_client');

// Integration tests for admin-service
describe('admin-service endpoints', () => {
  test('GET /api/about returns team members (first_name + last_name only)', async () => {
    const res = await client('admin')
      .get('/api/about')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);

    // Validate team member properties
    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('first_name');
      expect(res.body[0]).toHaveProperty('last_name');

      // no extra fields
      const keys = Object.keys(res.body[0]);
      expect(keys.length).toBe(2);
    }
  });
});
