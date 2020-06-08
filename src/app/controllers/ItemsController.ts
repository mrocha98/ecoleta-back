import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import { Item } from '../../types';
import knex from '../../database/connection';
import parseImageUrl from '../../utils/parseImageUrl';

class ItemsController {
  async index(req: Request, res: Response) {
    const items: Item[] | null = await knex.select(['id', 'title', 'image']).from<Item>('items');

    const serializedItems = items?.map(({ id, title, image }) => {
      return {
        id,
        title,
        image_url: parseImageUrl(image),
      };
    });
    return res.status(OK).json(serializedItems);
  }
}

export default new ItemsController();
