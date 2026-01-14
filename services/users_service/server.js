// Load env vars, app, and database
require('dotenv').config();

const app = require('./app');
const { connectMongo } = require('../../db/mongo');

// Bootstrap database and server
async function start() {
  await connectMongo();

  const port = Number(process.env.PORT) || Number(process.env.PORT_USERS) || 3001;
  app.listen(port, () => {
    console.log(`users-service listening on ${port}`);
  });
}

// Run startup sequence
start().catch((err) => {
  console.error(err);
  process.exit(1);
});
