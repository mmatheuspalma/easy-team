import { Router } from 'express';

import PermissionController from '../controllers/permission.controller';

const router = Router();
const controller = new PermissionController();

router.post('/permission', controller.createPermission.bind(controller) as any);
router.get('/permission', controller.getPermissions.bind(controller) as any);
router.get('/permission/:id', controller.getPermissionById.bind(controller) as any);

export default router;
