require('dotenv').config();

const app = require('./app');
const { connectMongo } = require('../../db/mongo');

async function start() {
  await connectMongo();

  const port = Number(process.env.PORT_LOGS) || 3003;
  app.listen(port, () => {
    console.log(`logs-service listening on ${port}`);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
