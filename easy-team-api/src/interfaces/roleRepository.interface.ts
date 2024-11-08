import { Role } from '../entities/role';

export interface IRoleRepository {
  create(name: string, description: string): Promise<Role>;
  findAll(): Promise<Role[]>;
  findById(id: number): Promise<Role | null>;
}
