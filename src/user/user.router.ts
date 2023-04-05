import { UserController } from '../user/controllers/user.controller';
import { BaseRouter } from '../shared/router/router';

export class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController);
  }

  routes(): void {
    //GET
    this.router.get('/users', (req, res) => this.controller.getUsers(req, res));
    this.router.get('/user/:id', (req, res) =>
      this.controller.getUserById(req, res),
    );

    //POST
    this.router.post('/user', (req, res) =>
      this.controller.createUser(req, res),
    );

    //PUT
    this.router.put('/user/:id', (req, res) =>
      this.controller.updateUserById(req, res),
    );

    //DELETE
    this.router.delete('/user/:id', (req, res) =>
      this.controller.deleteUserById(req, res),
    );
  }
}
