import { Request, Response } from "express";
import { getLesson } from "../../usecases/lesson/getLesson";

export const getLessonController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const lesson = await getLesson(parseInt(id));
    res.status(200).json(lesson);
  } catch (err: any) {
    if (err.message === 'Lesson not found') {
      res.status(404).json({ message: err.message });
    } else {
      res.status(400).json({ message: err.message });
    }
  }
};
