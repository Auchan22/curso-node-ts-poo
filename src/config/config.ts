import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource, DataSourceOptions } from 'typeorm/data-source';
import { UserEntity } from '../user/entities/user.entity';
import { CustomerEntity } from '../customers/entities/customer.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import { PurchasesProductsEntity } from '../purchase/entities/purchases-product.entity';
import { PurchaseEntity } from '../purchase/entities/purchase.entity';

export abstract class ConfigServer {
  constructor() {
    const nodeNameEnv = this.createPathEnv(this.nodeEnv);
    dotenv.config({
      path: nodeNameEnv,
    });
  }

  public getEnvironment(key: string) {
    return process.env[key];
  }

  public getNumberEnv(key: string): number {
    return Number(this.getEnvironment(key));
  }

  public get nodeEnv(): string {
    return this.getEnvironment('NODE_ENV')?.trim() || '';
  }

  public createPathEnv(path: string): string {
    const arrEnv: Array<string> = ['env'];

    if (path.length > 0) {
      const stringToArray = path.split('.');

      arrEnv.unshift(...stringToArray);
    }

    return '.' + arrEnv.join('.');
  }

  /**
   * Configuracion del ORM para la base de datos.
   *
   * @readonly
   * @type {DataSourceOptions}
   * @memberof ConfigServer
   */
  public get typeORMConfig(): DataSourceOptions {
    return {
      type: 'mysql',
      driver: {},
      host: this.getEnvironment('DB_HOST'),
      port: this.getNumberEnv('DB_PORT'),
      username: this.getEnvironment('DB_USER'),
      password: this.getEnvironment('DB_PASSWORD'),
      database: this.getEnvironment('DB_DATABASE'),
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
      migrations: ['src/**/entities/*.entity{.ts, .js}'],
      synchronize: true,
      logging: false,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }

  /**
   * Apertura de conexion a base de datos usando el DataSource
   *
   * @return {*}  {Promise<DataSource>}
   * @memberof ServerBoostrap
   */
  async dbConnection(): Promise<DataSource> {
    return await new DataSource(this.typeORMConfig).initialize();
  }
}
