import Role from '../entities/role';
import { IRoleRepository } from '../interfaces/roleRepository.interface';

import DatabaseClient from '../database/prismaClient';

export default class RoleRepository implements IRoleRepository {
  async create(name: string, description: string): Promise<Role> {
    return await DatabaseClient.role.create({
      data: {
        name,
        description
      }
    }) as Role;
  }

  async findAll(): Promise<Role[]> {
    return await DatabaseClient.role.findMany({
      include: {
        permissions: true,
      },
    }) as Role[];
  }

  async findById(id: number): Promise<Role | null> {
    return await DatabaseClient.role.findUnique({
      where: { id },
      include: {
        permissions: true,
      }
    }) as Role;
  }

  async assignPermission(id: number, permissionId: number): Promise<Role | null> {
    return await DatabaseClient.role.update({
      where: { id },
      data: {
        permissions: {
          connect: [{ id: permissionId }]
        }
      }
    }) as Role;
  }
}
