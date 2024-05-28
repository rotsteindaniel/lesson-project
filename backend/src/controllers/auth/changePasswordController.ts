import { Request, Response } from 'express';
import { changePassword } from '../../usecases/auth/changePassword';

export const changePasswordController = async (req: Request, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    await changePassword(req.user.userId, oldPassword, newPassword);
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
