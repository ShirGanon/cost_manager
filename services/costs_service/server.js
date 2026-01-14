// Load env vars, app, and database
require('dotenv').config();

const app = require('./app');
const { connectMongo } = require('../../db/mongo');

// Bootstrap database and server
async function start() {
  await connectMongo();

  // Set port with fallback
  const port = Number(process.env.PORT) || Number(process.env.PORT_COSTS) || 3002;
  app.listen(port, () => {
    console.log(`costs-service listening on ${port}`);
  });
}

// Run startup sequence
start().catch((err) => {
  console.error(err);
  process.exit(1);
});
