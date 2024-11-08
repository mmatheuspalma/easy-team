import { Router } from 'express';

// import AuthController from '../controllers/auth.controller';
import LocationController from '../controllers/location.controller';

const router = Router();
const controller = new LocationController();
// const authController = new AuthController();

router.get('/location', controller.getLocations.bind(controller) as any);
router.post('/location', controller.createLocation.bind(controller) as any);

export default router;
