import Role from '../entities/role';
import RoleRepository from '../repositories/role.repository';

export default class RoleService {
  private roleRepository = new RoleRepository();

  async createRole(name: string, description: string): Promise<Role> {
    return this.roleRepository.create(name, description);
  }

  async getRoles(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }

  async getRoleById(id: number): Promise<Role | null> {
    return this.roleRepository.findById(id);
  }

  async assignPermission(id: number, permissionId: number): Promise<Role | null> {
    return this.roleRepository.assignPermission(id, permissionId);
  }
}
