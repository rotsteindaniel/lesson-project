import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { registerController } from '../controllers/auth/registerController';
import { loginController } from '../controllers/auth/loginController';
import { changePasswordController } from '../controllers/auth/changePasswordController';

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/change-password', authMiddleware, changePasswordController);

export default router;
