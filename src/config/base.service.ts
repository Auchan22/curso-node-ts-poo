import { EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { ConfigServer } from './config';
import { BaseEntity } from './base.entity';

export class BaseService<T extends BaseEntity> extends ConfigServer {
  public execRepository: Promise<Repository<T>>;

  constructor(private getEntity: EntityTarget<T>) {
    super();
    this.execRepository = this.initRepository(this.getEntity);
  }

  async initRepository<T extends ObjectLiteral>(
    E: EntityTarget<T>,
  ): Promise<Repository<T>> {
    const getConn = await this.Connection;
    return getConn.getRepository(E);
  }
}
