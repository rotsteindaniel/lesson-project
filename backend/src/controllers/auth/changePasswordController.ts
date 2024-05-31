import { Request, Response } from 'express';
import { PrismaUserRepository } from '../../repositories/prismaUserRepository';
import { ChangePasswordUseCase } from '../../usecases/auth/changePassword';
import { ChangePasswordRequest } from '../../types/auth/changePasswordTypes';


const userRepository = new PrismaUserRepository();
const changePasswordUseCase = new ChangePasswordUseCase(userRepository);

export const changePasswordController = async (req: Request, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const request: ChangePasswordRequest = {
      userId: req.user.userId,
      oldPassword,
      newPassword,
    };

    const response = await changePasswordUseCase.execute(request);
    res.status(200).json(response);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};


