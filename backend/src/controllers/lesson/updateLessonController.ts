import { Request, Response } from "express";
import { updateLesson } from "../../usecases/lesson/updateLesson";

export const updateLessonController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, videoUrl } = req.body;

    if (!title || !videoUrl) {
      return res.status(400).json({ message: "Title and videoUrl are required" });
    }

    const lesson = await updateLesson(Number(id), title, description, videoUrl);
    res.status(200).json(lesson);
  } catch (err: any) {
    if (err.message === 'Lesson not found') {
      res.status(404).json({ message: err.message });
    } else {
      res.status(400).json({ message: err.message });
    }
  }
};
