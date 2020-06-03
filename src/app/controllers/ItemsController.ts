import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import { Item } from '../../types';
import knex from '../../database/connection';

class ItemsController {
  async index(req: Request, res: Response) {
    const items: Item[] | null = await knex.select(['id', 'title', 'image']).from<Item>('items');
    const { HOST, PORT } = process.env;

    const serializedItems = items?.map(({ id, title, image }) => {
      return {
        id,
        title,
        image_url: `http://${HOST}:${PORT}/${image}`,
      };
    });
    return res.status(OK).json(serializedItems);
  }
}

export default new ItemsController();
