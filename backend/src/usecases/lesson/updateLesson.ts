import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const updateLesson = async (id: number, title: string, description: string, videoUrl: string) => {
  try {
    const lesson = await prisma.lesson.update({
      where: { id },
      data: { title, description, videoUrl },
    });

    return lesson;
  } catch (error: any) {
    if (error.code === 'P2025') { // Código específico para "record not found"
      throw new Error('Lesson not found');
    }
    throw new Error('Failed to update lesson');
  }
};
