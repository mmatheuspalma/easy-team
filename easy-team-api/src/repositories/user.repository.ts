import User from "../entities/user";
import DatabaseClient from "../database/prismaClient";
import { UserRepositoryInterface } from "../interfaces/userRepository.interface";
import AuthService from "../services/auth.service";

export default class UserRepository implements UserRepositoryInterface {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService(this);
  }

  async getAll(): Promise<User[]> {
    return await DatabaseClient.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        createdAt: true,
        updatedAt: true,
      }
    }) as User[];
  }

  async createUser(name: string, email: string, password: string, roleId: number, locationId: number): Promise<User> {
    const hashedPassword = await this.authService.hashPassword(password);

    const user = await DatabaseClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: {
          connect: {
            id: roleId
          }
        },
        location: {
          connect: {
            id: locationId
          }
        }
      },
    });

    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await DatabaseClient.user.findUnique({
      where: { email },
      include: {
        role: {
          include: {
            permissions: true
          }
        },
        location: true,
      }
    });

    return user;
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await DatabaseClient.user.findUnique({
      where: { id },
      include: {
        role: {
          include: {
            permissions: true
          }
        },
        location: true,
      }
    });

    return user;
  }
}
