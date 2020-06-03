import app from './app';
import knex from './database/connection';

function stopServer() {
  console.log('Turning server off...');
  process.exit(1);
}

async function testDatabaseConnection(): Promise<void> {
  console.log('Trying to connect with database...');
  return knex
    .raw('SELECT 1')
    .then(() => console.log('Connection established!\n'))
    .catch((err) => {
      console.log(`Received an error when attempting to connect with Database.\n${err}`);
      stopServer();
    });
}

const { PORT, HOST, NODE_ENV, URL } = process.env;

const listenLog = () => (NODE_ENV === 'development' ? `${HOST}:${PORT}` : URL);

function startServer() {
  console.log('==========\t\tECOLETA SERVER\t\t==========\n');
  testDatabaseConnection().then(() => {
    console.log(`Listening on... ${listenLog()}\n\n`);
    app.listen(Number(PORT));
  });
}

startServer();
