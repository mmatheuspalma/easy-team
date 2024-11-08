import { Request, Response } from 'express';

import AuthService from '../services/auth.service';
import UserRepository from '../repositories/user.repository';

export default class AuthController {
  constructor (
    private authService = new AuthService(new UserRepository()),
  ) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
  
    try {
      const token = await this.authService.authenticate(email, password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
  
  authenticateToken(req: Request, res: Response, next: Function) {
    const token = req.headers['authorization']?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Access Denied' });
    }
  
    try {
      const decoded = this.authService.validateToken(token);
      (req as any).user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
  }
}
