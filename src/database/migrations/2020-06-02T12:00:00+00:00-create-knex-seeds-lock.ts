import Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('knex_seeds_lock', (table) => {
    table.bigIncrements('id').primary();
    table.string('file_name').notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('knex_seeds_lock');
}
