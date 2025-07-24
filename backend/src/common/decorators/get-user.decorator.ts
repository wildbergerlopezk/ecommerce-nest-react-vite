import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: keyof Express.User | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);

declare global {
  namespace Express {
    interface User {
      userId: string;
      email: string;
      role: string;
    }
  }
}
