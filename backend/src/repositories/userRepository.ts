import { User } from '@prisma/client';

export interface UserRepository {
  findById(userId: number): Promise<User | null>;
  updatePassword(userId: number, newPassword: string): Promise<void>;
}
