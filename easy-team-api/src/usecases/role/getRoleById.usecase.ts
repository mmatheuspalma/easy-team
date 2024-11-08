import RoleService from '../../services/role.service';

export default class GetRoleByIdUseCase {
  private roleService = new RoleService();

  async execute(id: number) {
    return this.roleService.getRoleById(id);
  }
}
