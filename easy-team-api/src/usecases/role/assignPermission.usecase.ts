import RoleService from '../../services/role.service';

export default class AssignPermissionUseCase {
  private roleService = new RoleService();

  async execute(id: number, permissionId: number) {
    return this.roleService.assignPermission(id, permissionId);
  }
}
