import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { UserRouter } from './user/user.router';
import { ConfigServer } from './config/config';
import { DataSource } from 'typeorm';
import { UserEntity } from './user/entities/user.entity';

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
    return [new UserRouter().router];
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port: ${this.port}`);
    });
  }

  /**
   * Apertura de conexion a base de datos usando el DataSource
   *
   * @return {*}  {Promise<DataSource>}
   * @memberof ServerBoostrap
   */
  async dbConnection(): Promise<void> {
    try {
      await new DataSource(this.typeORMConfig).initialize();
      console.log(`🚀  Database Connected`);
    } catch (error) {
      console.log(`🚀 Database Connection Error: ${error}`);
    }
  }
}

new ServerBootstrap();
