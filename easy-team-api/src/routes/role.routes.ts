import { Router } from 'express';

import RoleController from '../controllers/role.controller';

const router = Router();
const controller = new RoleController();

router.post('/role', controller.createRole.bind(controller) as any);
router.get('/role', controller.getRoles.bind(controller) as any);
router.get('/role/:id', controller.getRoleById.bind(controller) as any);
router.post('/role/:id', controller.assignPermission.bind(controller) as any);

export default router;
