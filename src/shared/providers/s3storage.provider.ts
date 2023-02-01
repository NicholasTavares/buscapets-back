import { S3 } from 'aws-sdk';
import uploadConfig from '../../config/upload.config';
import { randomBytes } from 'crypto';

export default class S3StorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: 'sa-east-1',
    });
  }

  async saveFile(file: Express.Multer.File): Promise<string> {
    /* TODO - remover imagem antiga na nuvem em caso de update */
    const fileHash = randomBytes(10).toString('hex');

    const filename = `${fileHash}-${file.originalname}`;

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: filename,
        ACL: 'public-read-write',
        Body: file.buffer,
        ContentType: file.mimetype,
      })
      .promise();

    return 'https://buscapets-pds.s3.sa-east-1.amazonaws.com/' + filename;
  }

  async saveFiles(files: Express.Multer.File[]): Promise<string[]> {
    /* TODO - remover imagem antiga na nuvem em caso de update */
    const urls = [];

    await Promise.all(
      files.map((file) => {
        const fileHash = randomBytes(10).toString('hex');
        urls.push({
          publication_picture: `https://buscapets-pds.s3.sa-east-1.amazonaws.com/${fileHash}-${file.originalname}`,
        });
        return new Promise((resolve) =>
          resolve(
            this.client
              .putObject({
                Bucket: uploadConfig.config.aws.bucket,
                Key: `${fileHash}-${file.originalname}`,
                ACL: 'public-read-write',
                Body: file.buffer,
                ContentType: file.mimetype,
              })
              .promise(),
          ),
        );
      }),
    );

    return urls;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}
