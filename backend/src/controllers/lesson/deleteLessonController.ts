import { Request, Response } from "express";
import { deleteLesson } from "../../usecases/lesson/deleteLesson";

export const deleteLessonController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteLesson(Number(id));
    res.status(200).json({ message: "Lesson deleted successfully" });
  } catch (err: any) {
    if (err.message === 'Lesson not found') {
      res.status(404).json({ message: err.message });
    } else {
      res.status(400).json({ message: err.message });
    }
  }
};
