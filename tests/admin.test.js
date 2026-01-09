const request = require('supertest');

const adminApp = require('../services/admin-service/app');

describe('admin-service endpoints', () => {
  test('GET /api/about returns team members (first_name + last_name only)', async () => {
    const res = await request(adminApp)
      .get('/api/about')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('first_name');
      expect(res.body[0]).toHaveProperty('last_name');

      // no extra fields
      const keys = Object.keys(res.body[0]);
      expect(keys.length).toBe(2);
    }
  });
});
