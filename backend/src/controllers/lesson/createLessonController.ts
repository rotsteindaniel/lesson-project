import { Request, Response } from "express";
import { createLesson } from "../../usecases/lesson/createLesson";

export const createLessonController = async (req: Request, res: Response) => {
  try {
    const { title, description, videoUrl } = req.body;
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!title || !videoUrl) {
      return res.status(400).json({ message: "Title and videoUrl are required" });
    }
    const lesson = await createLesson(req.user.userId, title, description, videoUrl);
    res.status(201).json(lesson);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
