import { CreateUser1669845315375 } from 'src/shared/migrations/1669845315375-CreateUser';
import { CreatePublication1669934691333 } from 'src/shared/migrations/1669934691333-CreatePublication';
import { CreateComment1669936133447 } from 'src/shared/migrations/1669936133447-CreateComment';
import { CreatePublicationPicture1669936859151 } from 'src/shared/migrations/1669936859151-CreatePublicationPicture';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  // Ao fazer o deploy, remover as informações críticas
  // necessário apenas para fazer migrations
  type: 'mysql',
  logging: true,
  host: 'localhost',
  port: 3307,
  username: 'buscapets',
  password: 'sqlP4SS',
  database: 'buscapets',
  synchronize: false,
  entities: [__dirname + '/../modules/**/entities/*.entity{.js,.ts}'],
  migrations: [
    CreateUser1669845315375,
    CreatePublication1669934691333,
    CreatePublicationPicture1669936859151,
    CreateComment1669936133447,
  ],
});
