import UserService from '../../services/user.service';

export default class GetUserByIdUseCase {
  private userService = new UserService();

  async execute(id: number) {
    return this.userService.getUserById(id);
  }
}
