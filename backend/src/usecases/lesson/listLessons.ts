import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const listLessons = async () => {
  const lessons = await prisma.lesson.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  return lessons;
};


