import PermissionService from '../../services/permission.service';

export default class GetPermissionByIdUseCase {
  private permissionService = new PermissionService();

  async execute(id: number) {
    return this.permissionService.getPermissionById(id);
  }
}
