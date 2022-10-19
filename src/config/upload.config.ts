import * as path from 'path';
import * as multer from 'multer';
import crypto from 'crypto';

type UploadConfig = {
  driver: 's3' | 'disk';
  tmpFolder: string;
  directory: string;
  multer: {
    storage: multer.StorageEngine;
  };
  config: {
    aws: {
      bucket: string;
    };
  };
};

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  directory: uploadFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');

        const filename = `${fileHash}-${file.originalname}`;

        callback(null, filename);
      },
    }),
  },
  config: {
    aws: {
      bucket: 'buscapets',
    },
  },
} as UploadConfig;
