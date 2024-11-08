import PermissionService from '../../services/permission.service';

export default class CreatePermissionUseCase {
  private permissionService = new PermissionService();

  async execute(name: string, description: string) {
    return this.permissionService.createPermission(name, description);
  }
}
