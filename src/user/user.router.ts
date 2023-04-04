import { UserController } from '../user/controllers/user.controller';
import { BaseRouter } from '../shared/router/router';

export class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController);
  }

  routes(): void {
    this.router.get('/user', this.controller.getUsers);
  }
}
