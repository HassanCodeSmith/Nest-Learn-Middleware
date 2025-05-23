import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

function VerifyJwtToken(token: string) {
  return true;
}

// =====================================
// 1. Class Base Middleware
// =====================================
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    // Your auth logic
    if (token && VerifyJwtToken(token)) {
      next();
      return;
    }

    throw new UnauthorizedException();
  }
}

// =====================================
// 2. Function Base Middleware
// =====================================
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.split(' ')[1];

  // Your auth logic
  if (token && VerifyJwtToken(token)) {
    next();
    return;
  }

  throw new UnauthorizedException();
}
