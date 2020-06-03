import { Router, Request, Response } from 'express';
import { NO_CONTENT } from 'http-status-codes';
import pointsController from './app/controllers/PointsController';
import itemsController from './app/controllers/ItemsController';

const routes = Router();

routes.get('/', (req: Request, res: Response) => res.sendStatus(NO_CONTENT));

routes.get('/items', itemsController.index);

routes.get('/points/', pointsController.index);
routes.get('/points/:id', pointsController.show);
routes.post('/points', pointsController.create);

export default routes;
