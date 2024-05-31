import { describe, it, expect, beforeEach } from 'vitest';
import bcrypt from 'bcryptjs';
import { InMemoryUserRepository } from '../../repositories/inMemoryUserRepository';
import { ChangePasswordUseCase } from '../../usecases/auth/changePassword';
import { ChangePasswordRequest } from '../../types/auth/changePasswordTypes';

describe('ChangePasswordUseCase', () => {
  let userRepository: InMemoryUserRepository;
  let changePasswordUseCase: ChangePasswordUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    changePasswordUseCase = new ChangePasswordUseCase(userRepository);

    const hashedPassword = bcrypt.hashSync('oldPassword', 10);
    userRepository.addUser({
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  it('should change the password', async () => {
    const request: ChangePasswordRequest = {
      userId: 1,
      oldPassword: 'oldPassword',
      newPassword: 'newPassword',
    };

    const response = await changePasswordUseCase.execute(request);
    expect(response).toEqual({ message: 'Password changed successfully' });
  });

  it('should throw an error if old password is incorrect', async () => {
    const request: ChangePasswordRequest = {
      userId: 1,
      oldPassword: 'wrongPassword',
      newPassword: 'newPassword',
    };

    await expect(changePasswordUseCase.execute(request)).rejects.toThrow('Invalid old password');
  });
});
