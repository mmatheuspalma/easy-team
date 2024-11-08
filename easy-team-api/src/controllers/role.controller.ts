import { Request, Response } from 'express';

import CreateRoleUseCase from '../usecases/role/createRole.usecase';
import GetRolesUseCase from '../usecases/role/getRoles.usecase';
import GetRoleByIdUseCase from '../usecases/role/getRoleById.usecase';
import AssignPermissionUseCase from '../usecases/role/assignPermission.usecase';

export default class RoleController {
  constructor (
    private getRolesUseCase = new GetRolesUseCase(),
    private createRoleUseCase = new CreateRoleUseCase(),
    private getRoleByIdUseCase = new GetRoleByIdUseCase(),
    private assignPermissionUseCase = new AssignPermissionUseCase(),
  ) {}

  async createRole(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    try {
      const role = await this.createRoleUseCase.execute(name, description);
      return res.status(201).json(role);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  async getRoles(req: Request, res: Response): Promise<Response> {
    try {
      const roles = await this.getRolesUseCase.execute();
      return res.status(200).json(roles);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  async getRoleById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const role = await this.getRoleByIdUseCase.execute(Number(id));
      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }
      return res.status(200).json(role);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  async assignPermission(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { permissionId } = req.body;

    try {
      const role = await this.assignPermissionUseCase.execute(Number(id), Number(permissionId));

      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }

      return res.status(200).json(role);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }
}
