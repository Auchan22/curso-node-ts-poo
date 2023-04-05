import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PurchasesProductsEntity } from '../purchase/entities/purchases-product.entity';
import { PurchaseEntity } from '../purchase/entities/purchase.entity';
import { UserEntity } from '../user/entities/user.entity';
import { CustomerEntity } from '../customers/entities/customer.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { CategoryEntity } from '../category/entities/category.entity';

import * as dotenv from 'dotenv';

dotenv.config({
  path:
    process.env.NODE_ENV !== undefined
      ? `.${process.env.NODE_ENV.trim()}.env`
      : '.env',
});

const Config: DataSourceOptions = {
  type: 'mysql',
  driver: {},
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    UserEntity,
    CustomerEntity,
    ProductEntity,
    CategoryEntity,
    PurchaseEntity,
    PurchasesProductsEntity,
  ], // Si queremos que busque fuera de un directorio y por nombre de archivo y extensión
  // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  // entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../../migrations/*{.ts, .js}'],
  synchronize: true,
  //   synchronize: false,
  //   migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const AppDataSource: DataSource = new DataSource(Config);
