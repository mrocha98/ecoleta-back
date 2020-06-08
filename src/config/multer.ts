import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const { NODE_ENV } = process.env;

const destination =
  NODE_ENV === 'development'
    ? path.resolve(__dirname, '..', '..', 'uploads')
    : path.resolve(__dirname, '..', '..', '..', 'uploads');

export default {
  storage: multer.diskStorage({
    destination,
    filename(req, file, callback) {
      const hash = crypto.randomBytes(6).toString('hex');

      const fileName = `${hash}-${file.originalname.substr(-10)}`;

      callback(null, fileName);
    },
  }),
};
