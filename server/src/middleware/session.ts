import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import type { AuthUser } from '../types';

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function createSessionToken(user: AuthUser) {
  return jwt.sign(user, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
}

export function requireSession(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization || '';
  const token = header.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Session required.' });
  }

  try {
    req.user = jwt.verify(token, config.jwtSecret) as AuthUser;
    return next();
  } catch {
    return res.status(401).json({ message: 'Session expired or invalid.' });
  }
}
