import Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('items', (table) => {
    table.bigIncrements('id').primary();
    table.string('image').notNullable();
    table.string('title').notNullable();
    table.unique(['image', 'title']);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('items');
}
