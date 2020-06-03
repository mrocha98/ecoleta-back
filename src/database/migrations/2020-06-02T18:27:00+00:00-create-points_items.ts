import Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('points_items', (table) => {
    table.bigIncrements('id').primary();
    table
      .bigInteger('point_id')
      .notNullable()
      .references('id')
      .inTable('points')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.bigInteger('item_id').notNullable().references('id').inTable('items').onDelete('CASCADE').onUpdate('CASCADE');
    table.unique(['point_id', 'item_id']);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('points_items');
}
