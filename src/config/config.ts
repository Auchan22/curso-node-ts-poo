import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource, DataSourceOptions } from 'typeorm/data-source';
import { UserEntity } from '../user/entities/user.entity';
import { CustomerEntity } from '../customers/entities/customer.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import { PurchasesProductsEntity } from '../purchase/entities/purchases-product.entity';
import { PurchaseEntity } from '../purchase/entities/purchase.entity';
import { AppDataSource } from './data.source';

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
   * Apertura de conexion a base de datos usando el DataSource
   *
   * @return {*}  {Promise<DataSource>}
   * @memberof ServerBoostrap
   */
  get Connection(): Promise<DataSource> {
    return AppDataSource.initialize();
  }
}
