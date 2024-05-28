import jwt, { JwtPayload } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your_jwt_secret';

export const generateToken = (userId: number) => {
  return jwt.sign({ userId }, secret, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, secret);
  if (typeof decoded === 'object' && 'userId' in decoded) {
    return decoded as { userId: number } & JwtPayload;
  }
  throw new Error('Invalid token structure');
};

