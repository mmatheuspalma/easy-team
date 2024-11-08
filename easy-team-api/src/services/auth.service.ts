import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { readFileSync } from 'fs';

import User from '../entities/user';
import { UserRepositoryInterface } from '../interfaces/userRepository.interface';

const publicKey = readFileSync('./keys/public.key', 'utf8');
const privateKey = readFileSync('./keys/private.key', 'utf8');

const JWT_EXPIRES_IN = '2h';

export default class AuthService {
  constructor(
    private userRepository: UserRepositoryInterface
  ) {}

  generateToken(user: User): string {
    const payload = {
      employeeId: user.id,
      locationId: user.location?.id,
      organizationId: user.location?.id,
      partnerId: 'd40e2f92-2523-4833-a9cc-a95cef576876',
      accessRole: {
        name: user.role?.name.toLocaleLowerCase(),
        permissions: user.role?.permissions?.map(permission => permission.name),
      },
      role: {
        name: user.role?.name,
      },
    };

    return jwt.sign(payload, privateKey, { expiresIn: JWT_EXPIRES_IN, algorithm: "RS256" });
  }

  validateToken(token: string): any {
    try {
      return jwt.verify(token, publicKey);
    } catch (err) {
      throw new Error('Invalid or expired token');
    }
  }

  async authenticate(email: string, password: string): Promise<string> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user?.password as string);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    return this.generateToken(user);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
