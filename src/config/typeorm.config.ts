import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');
console.log(dbConfig);

export const typeORMConfig: TypeOrmModule = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
