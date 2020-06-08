import { Request, Response } from 'express';
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from 'http-status-codes';
import { PointsBody } from '../../types';
import knex from '../../database/connection';
import parseImageURL from '../../utils/parseImageUrl';

class PointsController {
  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items)
      .split(',')
      .map((item) => Number(item.trim()));

    const points = await knex
      .from('points')
      .join('points_items', 'points.id', '=', 'points_items.point_id')
      .whereIn('points_items.item_id', parsedItems)
      .andWhere('city', String(city))
      .andWhere('uf', String(uf))
      .distinct()
      .select('points.*');

    const serializedPoints = points.map((point) => {
      return { ...point, image_url: parseImageURL(point.image) };
    });

    return res.status(OK).json(serializedPoints);
  }

  async show(req: Request, res: Response) {
    const { id: redID } = req.params;
    const id = Number(redID);

    const point = await knex.from('points').where({ id }).first();

    if (!point) return res.status(NOT_FOUND).json({ message: 'Ponto não encontrado' });

    const serializedPoint = {
      ...point,
      image_url: parseImageURL(point.image),
    };

    const items = await knex
      .from('items')
      .join('points_items', 'items.id', '=', 'points_items.item_id')
      .where('points_items.point_id', id)
      .select(['items.title']);

    return res.status(OK).json({ point: serializedPoint, items });
  }

  async create(req: Request, res: Response) {
    const { city, email, items, latitude, longitude, name, uf, whatsapp } = req.body as PointsBody;

    const emailExists = await knex.from('points').where({ email }).select('email').first();
    if (emailExists) return res.status(BAD_REQUEST).json({ message: 'E-mail já cadastrado' });

    const locationExists = await knex.from('points').where({ latitude }).andWhere({ longitude }).select('id').first();
    if (locationExists) return res.status(BAD_REQUEST).json({ message: 'Essa localização já foi cadastrada' });

    try {
      await knex.transaction(async (trx) => {
        const point = {
          image: req.file?.filename || 'dummy-image.jpg',
          name,
          email,
          whatsapp,
          latitude,
          longitude,
          city,
          uf,
        };

        const insrtedIds = await trx('points').insert(point).returning('id');
        const point_id = insrtedIds[0];

        const parsedItems = items.split(',').map((item) => Number(item));

        const pointItems = parsedItems.map((item_id: number) => {
          return {
            item_id,
            point_id,
          };
        });

        await trx('points_items').insert(pointItems);
        return res.status(CREATED).json({ id: point_id, ...point });
      });
    } catch (err) {
      console.log(err);
      return res.sendStatus(BAD_REQUEST);
    }
  }
}

export default new PointsController();
