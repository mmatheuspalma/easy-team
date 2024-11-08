import { Permission } from '../entities/permission';

export interface IPermissionRepository {
  create(name: string, description: string): Promise<Permission>;
  findAll(): Promise<Permission[]>;
  findById(id: number): Promise<Permission | null>;
}
