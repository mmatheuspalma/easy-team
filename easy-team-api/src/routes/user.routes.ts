import { Router } from 'express';

import UserController from '../controllers/user.controller';

const router = Router();
const controller = new UserController();

router.post('/user', controller.createUser.bind(controller) as any);
router.get('/user', controller.listUser.bind(controller) as any);
router.get('/user/:id', controller.getUserById.bind(controller) as any);

export default router;
