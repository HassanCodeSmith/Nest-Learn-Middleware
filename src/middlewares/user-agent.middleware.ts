import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  Optional,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// ========================================
// 1. Function Base Middleware
// ========================================
export function userAgentMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const ua = req.headers['user-agent'];
  console.log('Middleware: ', ua);

  req['ua'] = ua;

  next();
}

// ========================================
// 2. Class Base Middleware
// ========================================
export class UserAgentOptions {
  accepted?: string[];
}

@Injectable()
export class UserAgentMiddleware implements NestMiddleware {
  constructor(@Optional() private options: UserAgentOptions) {}

  use(req: Request, res: Response, next: NextFunction) {
    const ua = req.headers['user-agent'] || '';
    console.log('Middelware: ', ua);

    if (!this.isUserAgentAcceptable(ua)) {
      //   res.status(HttpStatus.FORBIDDEN).json({ message: 'Not Allowed' });
      //   return;
      throw new ForbiddenException('Not Allowed');
    }

    req['ua'] = ua;

    next();
  }

  private isUserAgentAcceptable(userAgent: string) {
    // const acceptedUserAgents = ['chrome', 'firefox'];
    const acceptedUserAgents = this.options?.accepted || [];

    if (!acceptedUserAgents.length) {
      return true;
    }

    return acceptedUserAgents.some((agent) =>
      userAgent.toLowerCase().includes(agent.toLowerCase()),
    );
  }
}
