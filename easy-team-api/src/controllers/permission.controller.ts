import { Request, Response } from 'express';

import GetPermissionsUseCase from '../usecases/permission/getPermissions.usecase';
import CreatePermissionUseCase from '../usecases/permission/createPermission.usecase';
import GetPermissionByIdUseCase from '../usecases/permission/getPermissionById.usecase';

export default class PermissionController {
  constructor (
    private getPermissionsUseCase = new GetPermissionsUseCase(),
    private createPermissionUseCase = new CreatePermissionUseCase(),
    private getPermissionByIdUseCase = new GetPermissionByIdUseCase(),
  ) {}

  async createPermission(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;
    try {
      const permission = await this.createPermissionUseCase.execute(name, description);
      return res.status(201).json(permission);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  async getPermissions(req: Request, res: Response): Promise<Response> {
    try {
      const permissions = await this.getPermissionsUseCase.execute();
      return res.status(200).json(permissions);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  async getPermissionById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const permission = await this.getPermissionByIdUseCase.execute(Number(id));
      if (!permission) {
        return res.status(404).json({ message: 'Permission not found' });
      }
      return res.status(200).json(permission);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }
}
