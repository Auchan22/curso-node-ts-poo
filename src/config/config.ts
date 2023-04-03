import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSourceOptions } from 'typeorm/data-source';
import { UserEntity } from '../entities/user.entity';

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
      entities: [UserEntity], // Si queremos que busque fuera de un directorio y por nombre de archivo y extensión
      // entities: [__dirname + '../entities/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../../migrations/*{.ts, .js}'],
      synchronize: true,
      logging: false,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
