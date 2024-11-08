import User from '../entities/user';
import UserRepository from '../repositories/user.repository';

export default class UserService {
  private userRepository = new UserRepository();

  async createUser(name: string, email: string, password: string, roleId: number, locationId: number): Promise<User> {
    return this.userRepository.createUser(name, email, password, roleId, locationId);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.getUserByEmail(email);
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.getUserById(id);
  }
}
