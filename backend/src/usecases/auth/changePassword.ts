import bcrypt from 'bcryptjs';
import { UserRepository } from '../../repositories/userRepository';
import { ChangePasswordRequest, ChangePasswordResponse } from '../../types/auth/changePasswordTypes';
export class ChangePasswordUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: ChangePasswordRequest): Promise<ChangePasswordResponse> {
    const { userId, oldPassword, newPassword } = request;

    const user = await this.userRepository.findById(userId);
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
      throw new Error('Invalid old password');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userRepository.updatePassword(userId, hashedPassword);

    return { message: 'Password changed successfully' };
  }
}

