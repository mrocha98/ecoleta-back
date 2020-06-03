import Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('points', (table) => {
    table.bigIncrements('id').primary();
    table.string('image').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('whatsapp').notNullable();
    table.decimal('latitude', 10, 8).notNullable();
    table.decimal('longitude', 11, 8).notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
    table.unique(['latitude', 'longitude']);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('points');
}
