import { PrismaClient, User } from '@prisma/client';
import { UserRepository } from './userRepository';

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {
  async findById(userId: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id: userId } });
  }

  async updatePassword(userId: number, newPassword: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { password: newPassword },
    });
  }
}
