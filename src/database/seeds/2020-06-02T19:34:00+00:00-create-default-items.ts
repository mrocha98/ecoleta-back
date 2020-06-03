import Knex from 'knex';
import path from 'path';

export async function seed(knex: Knex): Promise<any> {
  const file_name = path.basename(__filename);
  const seedExists = await knex('knex_seeds_lock').where({ file_name }).first();

  if (seedExists) return;

  await knex('items').insert([
    { title: 'Lâmpadas', image: 'lampadas.svg' },
    { title: 'Pilhas e Baterias', image: 'baterias.svg' },
    { title: 'Papéis e Papelão', image: 'papeis-papelao.svg' },
    { title: 'Resíduos Eletrônicos', image: 'eletronicos.svg' },
    { title: 'Resíduos Orgânicos', image: 'organicos.svg' },
    { title: 'Óleo de Cozinha', image: 'oleo.svg' },
  ]);

  await knex('knex_seeds_lock').insert({ file_name });
}
