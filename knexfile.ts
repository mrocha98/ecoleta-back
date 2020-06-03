import path from 'path';
import './src/env';

const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env;

module.exports = {
  client: 'pg',
  version: '12.3',
  connection: {
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASS,
  },
  searchPath: ['knex', 'public'],
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
  },
};
