import { Router, Request, Response } from 'express';
import { NO_CONTENT } from 'http-status-codes';

const routes = Router();

routes.get('/', (req: Request, res: Response) => res.sendStatus(NO_CONTENT));

export default routes;
