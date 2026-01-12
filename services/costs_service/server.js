require('dotenv').config();

const app = require('./app');
const { connectMongo } = require('../../db/mongo');

async function start() {
  await connectMongo();

  const port = Number(process.env.PORT) || Number(process.env.PORT_COSTS) || 3002;
  app.listen(port, () => {
    console.log(`costs-service listening on ${port}`);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
