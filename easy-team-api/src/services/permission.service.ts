import Permission from '../entities/permission';
import PermissionRepository from '../repositories/permission.repository';

export default class PermissionService {
  private permissionRepository = new PermissionRepository();

  async createPermission(name: string, description: string): Promise<Permission> {
    return this.permissionRepository.create(name, description);
  }

  async getPermissions(): Promise<Permission[]> {
    return this.permissionRepository.findAll();
  }

  async getPermissionById(id: number): Promise<Permission | null> {
    return this.permissionRepository.findById(id);
  }
}
