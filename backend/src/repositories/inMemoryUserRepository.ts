import { User } from '@prisma/client';
import { UserRepository } from './userRepository';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async findById(userId: number): Promise<User | null> {
    return this.users.find(user => user.id === userId) || null;
  }

  async updatePassword(userId: number, newPassword: string): Promise<void> {
    const user = this.users.find(user => user.id === userId);
    if (user) {
      user.password = newPassword;
    }
  }

  addUser(user: User): void {
    this.users.push(user);
  }
}
