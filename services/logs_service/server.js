// Load env vars, app, and database
require('dotenv').config();

const app = require('./app');
const { connectMongo } = require('../../db/mongo');

// Bootstrap database and server
async function start() {
  await connectMongo();

  // Set port with fallback
  const port = Number(process.env.PORT) || Number(process.env.PORT_LOGS) || 3003;
  app.listen(port, () => {
    console.log(`logs-service listening on ${port}`);
  });
}

// Run startup sequence
start().catch((err) => {
  console.error(err);
  process.exit(1);
});
