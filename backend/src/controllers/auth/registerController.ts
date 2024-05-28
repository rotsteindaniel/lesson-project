import { Request, Response } from 'express';
import { register } from '../../usecases/auth/register';

export const registerController = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const user = await register(email, password, name);

    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json(userWithoutPassword);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
