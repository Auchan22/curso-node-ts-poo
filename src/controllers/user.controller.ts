import { Request, Response } from 'express';

export class UserController {
  public getUsers(req: Request, res: Response) {
    res.status(200).json({
      user: { nombre: 'Agustin' },
    });
  }
}
