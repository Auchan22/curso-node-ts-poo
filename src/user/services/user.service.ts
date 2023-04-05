import { BaseService } from '../../config/base.service';
import { UserEntity } from '../entities/user.entity';
import { UserDTO } from '../dto/user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

export class UserService extends BaseService<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  //GET
  async findUserById(id: string): Promise<UserEntity | null> {
    const data = (await this.execRepository).findOneBy({ id });
    return data;
  }
  async findAllUser(): Promise<UserEntity[]> {
    return (await this.execRepository).find();
  }

  //POST
  async createUser(body: UserDTO): Promise<UserEntity> {
    return (await this.execRepository).save(body);
  }

  //PUT
  async updateUser(
    id: string,
    updateInfo: Partial<UserDTO>,
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, updateInfo);
  }

  //DELETE
  async deleteUser(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }
}
