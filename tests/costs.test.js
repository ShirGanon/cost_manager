// Costs service tests
const { client } = require('./api_client');

// Helper to generate tomorrow's date
function tomorrowIsoDate() {
  const now = new Date();
  const t = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return t.toISOString().slice(0, 10); // YYYY-MM-DD
}

describe('costs-service endpoints', () => {
  test('POST /api/add rejects past date', async () => {
    // Ensure user exists (requirement)
    await client('users')
      .post('/api/add')
      .send({ id: 123123, first_name: 'mosh', last_name: 'israeli', birthday: '1990-01-01' })
      .expect(200);

    // Test 400 error on past date
    const res = await client('costs')
      .post('/api/add')
      .send({
        description: 'pizza',
        category: 'food',
        // Provide invalid past date payload
        userid: 123123,
        sum: 12,
        date: '2025-02-09'
      })
      .expect(400);

    // Assert error response fields
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('message');
  });

  test('POST /api/add accepts future date', async () => {
    // Verify user existence for test
    await client('users')
      .post('/api/add')
      .send({ id: 123123, first_name: 'mosh', last_name: 'israeli', birthday: '1990-01-01' })
      .expect(200);

    // Test persistence of future cost items
    const res = await client('costs')
      .post('/api/add')
      .send({
        description: 'gym membership',
        category: 'sports',
        // Post valid cost with future date
        userid: 123123,
        sum: 120,
        date: tomorrowIsoDate()
      })
      .expect(200);

    // Validate returned object integrity
    expect(res.body).toHaveProperty('description', 'gym membership');
    expect(res.body).toHaveProperty('category', 'sports');
    // Match numerical and date values
    expect(res.body).toHaveProperty('userid', 123123);
    expect(res.body).toHaveProperty('sum', 120);
    expect(res.body).toHaveProperty('date');
  });

  test('GET /api/report returns grouped report structure', async () => {
    // Ensure user exists before report test
    await client('users')
      .post('/api/add')
      .send({ id: 123123, first_name: 'mosh', last_name: 'israeli', birthday: '1990-01-01' })
      .expect(200);

    // Add a cost for current month (today)
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = now.getMonth() + 1;

    // Create cost entry for current month
    await client('costs')
      .post('/api/add')
      .send({
        description: 'choco',
        category: 'food',
        // Use current date for aggregation test
        userid: 123123,
        sum: 12,
        date: now.toISOString().slice(0, 10)
      })
      .expect(200);

    // Fetch report and validate schema
    const res = await client('costs')
      .get('/api/report')
      .query({ id: 123123, year: yyyy, month: mm })
      .expect(200);

    // Assert report ownership and grouping
    expect(res.body).toHaveProperty('userid', 123123);
    expect(res.body).toHaveProperty('year', yyyy);
    expect(res.body).toHaveProperty('month', mm);
    expect(Array.isArray(res.body.costs)).toBe(true);

  });
  // Invalid category test
  test('POST /api/add rejects invalid category', async () => {
    await client('users')
      .post('/api/add')
      .send({ id: 123123, first_name: 'mosh', last_name: 'israeli', birthday: '1990-01-01' })
      .expect(200);

    const res = await client('costs')
      .post('/api/add')
      .send({ userid: 123123, description: 'something', category: 'travel', sum: 10 })
      .expect(400);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('message');
  });
});
