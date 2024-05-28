import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getLesson = async (id: number) => {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!lesson) {
      throw new Error('Lesson not found');
    }

    return lesson;
  } catch (error: any) {
    if (error.message === 'Lesson not found') {
      throw new Error('Lesson not found');
    }
    throw new Error('Failed to retrieve lesson');
  }
};
