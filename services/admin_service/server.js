// Load environment variables from .env and import server and database configurations
require('dotenv').config();

const app = require('./app');
const { connectMongo } = require('../../db/mongo');

/**
 * Initializes the service by establishing a database connection and 
 * starting the Express server on the designated port.
 */
async function start() {
  await connectMongo();

  // Determine the port from environment variables or use 3004 as a fallback
  const port = Number(process.env.PORT) || Number(process.env.PORT_ADMIN) || 3004;
  app.listen(port, () => {
    console.log(`admin-service listening on ${port}`);
  });
}

// Execute the bootstrap process and terminate the process if a fatal error occurs
start().catch((err) => {
  console.error(err);
  process.exit(1);
});
