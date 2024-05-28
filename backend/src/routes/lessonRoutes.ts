import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { createLessonController } from '../controllers/lesson/createLessonController';
import { listLessonsController } from '../controllers/lesson/listLessonsController';
import { getLessonController } from '../controllers/lesson/getLessonController';
import { updateLessonController } from '../controllers/lesson/updateLessonController';
import { deleteLessonController } from '../controllers/lesson/deleteLessonController';

const router = Router();

router.post('/', authMiddleware, createLessonController);
router.get('/', listLessonsController);
router.get('/:id', getLessonController);
router.put('/:id', authMiddleware, updateLessonController);
router.delete('/:id', authMiddleware, deleteLessonController);

export default router;

