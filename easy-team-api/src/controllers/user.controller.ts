import { Request, Response } from 'express';

import ListUserUseCase from '../usecases/user/listUser.usecase';
import CreateUserUseCase from '../usecases/user/createUser.usecase';
import GetUserByIdUseCase from '../usecases/user/getUserById.usecase';

export default class UserController {
  constructor(
    private listUserUseCase = new ListUserUseCase(),
    private createUserUseCase = new CreateUserUseCase(),
    private getUserByIdUseCase = new GetUserByIdUseCase(),
  ) {}

  async createUser(req: Request, res: Response): Promise<Response> {
    const { name, email, password, roleId, locationId } = req.body;

    try {
      const user = await this.createUserUseCase.execute(name, email, password, roleId, locationId);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }
  
  async listUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.listUserUseCase.execute();
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const user = await this.getUserByIdUseCase.execute(Number(id));
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }
}
