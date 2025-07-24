import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const targetUserId = request.params.id;

    if (user.role === 'ADMIN' || user.id === targetUserId) {
      return true;
    }

    throw new ForbiddenException('No tienes permiso para esta acción');
  }
}
