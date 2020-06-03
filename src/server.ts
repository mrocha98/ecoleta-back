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

const { PORT, HOST } = process.env;

function startServer() {
  console.log('==========\t\tECOLETA SERVER\t\t==========\n');
  testDatabaseConnection().then(() => {
    console.log(`Listening on... ${HOST}:${PORT}\n\n`);
    app.listen(Number(PORT));
  });
}

startServer();
