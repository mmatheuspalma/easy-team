import PermissionService from '../../services/permission.service';

export default class GetPermissionsUseCase {
  private permissionService = new PermissionService();

  async execute() {
    return this.permissionService.getPermissions();
  }
}
