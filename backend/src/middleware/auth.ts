import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.warn('❌ No token received');
    res.status(401).json({ error: 'No token' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

    if (!decoded.userId) {
      throw new Error('JWT payload missing userId');
    }

    req.user = { userId: decoded.userId }; // ✅ Attach correctly
    next();
  } catch (err) {
    console.error('❌ Invalid token:', err);
    res.status(401).json({ error: 'Invalid token' });
  }
};
