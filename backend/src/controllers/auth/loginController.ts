import { Request, Response } from 'express';
import { login } from '../../usecases/auth/login';

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await login(email, password);

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({ user: userWithoutPassword, token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
