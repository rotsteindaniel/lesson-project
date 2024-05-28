import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const deleteLesson = async (id: number) => {
  try {
    await prisma.lesson.delete({
      where: { id },
    });
  } catch (error: any) {
    if (error.code === 'P2025') { // Código específico para "record not found"
      throw new Error('Lesson not found');
    }
    throw new Error('Failed to delete lesson');
  }
};