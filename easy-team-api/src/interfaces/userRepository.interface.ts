import User from "../entities/user";

export interface UserRepositoryInterface {
  getAll(): Promise<User[]>;
  createUser(name: string, email: string, password: string, roleId: number, locationId: number): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
}
