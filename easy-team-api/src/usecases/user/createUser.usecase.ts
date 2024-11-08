import UserService from "../../services/user.service";

export default class CreateUserUseCase {
  private userService = new UserService();

  async execute(name: string, email: string, password: string, roleId: number, locationId: number) {
    return this.userService.createUser(name, email, password, roleId, locationId);
  }
}
