import RoleService from '../../services/role.service';

export default class CreateRoleUseCase {
  private roleService = new RoleService();

  async execute(name: string, description: string) {
    return this.roleService.createRole(name, description);
  }
}
