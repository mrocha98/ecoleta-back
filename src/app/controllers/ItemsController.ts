import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import { Item } from '../../types';
import knex from '../../database/connection';

class ItemsController {
  async index(req: Request, res: Response) {
    const items: Item[] | null = await knex.select(['id', 'title', 'image']).from<Item>('items');
    const { HOST, PORT, NODE_ENV, URL } = process.env;

    const getParsedImageURL = (image: string) =>
      NODE_ENV === 'development' ? `http://${HOST}:${PORT}/uploads/${image}` : `${URL}/uploads/${image}`;
    const serializedItems = items?.map(({ id, title, image }) => {
      return {
        id,
        title,
        image_url: getParsedImageURL(image),
      };
    });
    return res.status(OK).json(serializedItems);
  }
}

export default new ItemsController();
