import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  return {
    type: 'mysql',
    logging: true,
    host: process.env.DB_MAIN_HOST,
    port: process.env.DB_MAIN_PORT,
    username: process.env.DB_MAIN_USER,
    password: process.env.DB_MAIN_PASSWORD,
    database: process.env.DB_MAIN_DATABASE,
    autoLoadEntities: false,
    synchronize: false,
    entities: [__dirname + '/../modules/**/entities/*.entity{.js,.ts}'],
  };
});
