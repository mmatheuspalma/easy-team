import UserService from '../../services/user.service';

export default class ListUserUseCase {
  private userService = new UserService();

  async execute() {
    return this.userService.getUsers();
  }
}
