import { Router } from 'express';

import AuthController from '../controllers/auth.controller';

const router = Router();
const controller = new AuthController();

router.post('/auth/login', controller.login.bind(controller) as any);

export default router;
