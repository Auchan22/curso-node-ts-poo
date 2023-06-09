import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { HttpResponse } from '../../shared/response/http.response';
import { DeleteResult, UpdateResult } from 'typeorm';

export class UserController {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  async getUsers(req: Request, res: Response) {
    try {
      const data = await this.userService.findAllUser();
      if (data.length === 0)
        return this.httpResponse.NotFound(res, 'No existe el dato');
      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Error(res, error);
    }
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.userService.findUserById(id);
      if (!data) return this.httpResponse.NotFound(res, 'No existe el dato');
      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Error(res, error);
    }
  }

  async createUser(req: Request, res: Response) {
    const { body } = req;
    try {
      const data = await this.userService.createUser(body);
      if (!data) return this.httpResponse.NotFound(res, 'No existe el dato');
      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Error(res, error);
    }
  }

  async updateUserById(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;
    try {
      const data: UpdateResult = await this.userService.updateUser(id, body);
      if (!data.affected)
        return this.httpResponse.NotFound(res, 'Hay un error al actualizar');
      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Error(res, error);
    }
  }

  async deleteUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: DeleteResult = await this.userService.deleteUser(id);
      if (!data.affected)
        return this.httpResponse.NotFound(res, 'Hay un error al eliminar');
      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Error(res, error);
    }
  }
}
