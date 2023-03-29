import { Router } from 'express';

export class BaseRouter<TController> {
  public router: Router;
  public controller: TController;
  //   public middleware: TMiddleware

  //Al instanciar una clase hija, le decimos que al momento de pasar esa prop, instancia una nueva clase del tipo T, en este caso, TController, similar a Dependency Injection
  constructor(_TController: { new (): TController }) {
    this.router = Router();
    this.controller = new _TController();
    this.routes();
  }

  routes(): void {}
}
