import Permission from '../entities/permission';
import { IPermissionRepository } from '../interfaces/permissionRepository.interface';

import DatabaseClient from '../database/prismaClient';

export default class PermissionRepository implements IPermissionRepository {
  async create(name: string, description: string): Promise<Permission> {
    return await DatabaseClient.permission.create({
      data: {
        name,
        description
      }
    }) as Permission;
  }

  async findAll(): Promise<Permission[]> {
    return await DatabaseClient.permission.findMany() as Permission[];
  }

  async findById(id: number): Promise<Permission | null> {
    return await DatabaseClient.permission.findUnique({
      where: { id },
    }) as Permission;
  }
}
