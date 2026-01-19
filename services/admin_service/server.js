//load env vars, app and database
require('dotenv').config();

const app = require('./app');
const { connectMongo } = require('../../db/mongo');

// Bootstrap database and server
async function start() {
  await connectMongo();

  // Set port with 3004 fallback
  const port = Number(process.env.PORT) || Number(process.env.PORT_ADMIN) || 3004;
  app.listen(port, () => {
    console.log(`admin-service listening on ${port}`);
  });
}

//Run bootstrap or exit on error
start().catch((err) => {
  console.error(err);
  process.exit(1);
});
