import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createLesson = async (userId: number, title: string, description: string, videoUrl: string) => {
  // Verificar se o usuário existe antes de criar a aula
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new Error('Invalid userId');
  }

  const lesson = await prisma.lesson.create({
    data: {
      title,
      description,
      videoUrl,
      userId,
    },
  });
  return lesson;
};


