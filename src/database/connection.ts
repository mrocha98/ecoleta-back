import knex from 'knex';

const { DB_HOST, DB_NAME, DB_USER, DB_PASS, NODE_ENV } = process.env;

const connection = knex({
  client: 'pg',
  version: '12.3',
  connection: {
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASS,
  },
  searchPath: ['knex', 'public'],
  debug: NODE_ENV === 'development',
});

export default connection;
