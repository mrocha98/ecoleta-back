import app from './app';

const { PORT, HOST } = process.env;

function greetings() {
  console.log('==========\t\tECOLETA SERVER\t\t==========');
  console.log(`listening on... ${HOST}:${PORT}`);
}

greetings();

app.listen(Number(PORT));
