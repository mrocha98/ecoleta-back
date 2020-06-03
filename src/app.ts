import './env';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes';

class App {
  public server: Express;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.staticRoutes();
  }

  middlewares() {
    this.server.use(bodyParser.urlencoded({ extended: false }));
    this.server.use(bodyParser.json());
    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(morgan('dev'));
  }

  routes() {
    this.server.use(routes);
  }

  staticRoutes() {
    const uploadsPath =
      process.env.NODE_ENV === 'development'
        ? path.resolve(__dirname, '..', 'uploads')
        : path.resolve(__dirname, '..', 'src', 'uploads');
    this.server.use('/uploads', express.static(uploadsPath));
  }
}

export default new App().server;
