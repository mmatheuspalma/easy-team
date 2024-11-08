import RoleService from '../../services/role.service';

export default class GetRolesUseCase {
  private roleService = new RoleService();

  async execute() {
    return this.roleService.getRoles();
  }
}
