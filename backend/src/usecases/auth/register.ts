import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const register = async (email: string, password: string, name?: string) => {

   const existingUser = await prisma.user.findUnique({ where: { email } });
   if (existingUser) {
     throw new Error('Email already in use');
   }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });
  return user;
};
