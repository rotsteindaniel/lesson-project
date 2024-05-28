import { Request, Response } from "express";
import { listLessons } from "../../usecases/lesson/listLessons";

export const listLessonsController = async (req: Request, res: Response) => {
  try {
    const lessons = await listLessons();
    const sanitizedLessons = lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      videoUrl: lesson.videoUrl,
      createdAt: lesson.createdAt,
      updatedAt: lesson.updatedAt,
      userId: lesson.userId,
      user: {
        name: lesson.user.name,
      },
    }));
    res.status(200).json(sanitizedLessons);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
