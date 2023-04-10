import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { UserRouter } from './user/user.router';
import { ConfigServer } from './config/config';
import { DataSource } from 'typeorm';
import { UserEntity } from './user/entities/user.entity';
import { CategoryRouter } from './category/category.router';
import { CustomerRouter } from './customers/customer.route';
import { ProductRouter } from './product/product.router';
import { PurchaseRouter } from './purchase/purchase.router';
import { PurchaseProductRouter } from './purchase/purchases-product.router';

class ServerBootstrap extends ConfigServer {
  public app: express.Application = express();
  private port: number = this.getNumberEnv('PORT');

  constructor() {
    super();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(morgan('dev'));

    this.dbConnection();
    this.app.use('/api', this.routers());
    this.listen();
  }

  public routers(): Array<express.Router> {
    return [
      new UserRouter().router,
      new CategoryRouter().router,
      new CustomerRouter().router,
      new ProductRouter().router,
      new PurchaseRouter().router,
      new PurchaseProductRouter().router,
    ];
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port: ${this.port}`);
    });
  }

  async dbConnection(): Promise<DataSource | void> {
    return this.Connection.then(() =>
      console.log('🚀 Database Connected'),
    ).catch((err) => console.error('❌ Hubo un error: ', err));
  }
}

new ServerBootstrap();
