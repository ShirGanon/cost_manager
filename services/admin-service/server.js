require('dotenv').config();

const app = require('./app');
const { connectMongo } = require('../../db/mongo');

async function start() {
  await connectMongo();

  const port = Number(process.env.PORT) || Number(process.env.PORT_ADMIN) || 3004;
  app.listen(port, () => {
    console.log(`admin-service listening on ${port}`);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
