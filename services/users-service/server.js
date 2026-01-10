require('dotenv').config();

const app = require('./app');
const { connectMongo } = require('../../db/mongo');

async function start() {
  await connectMongo();

  const port = Number(process.env.PORT) || Number(process.env.PORT_USERS) || 3001;
  app.listen(port, () => {
    console.log(`users-service listening on ${port}`);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
