import { Observable } from 'rxjs';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
//import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';

const fakeUser = {
  username: 'daggy',
  roles: ['ADMIN', 'OWNER', 'MODERATOR', 'GUEST'],
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('hello world in the roles guard');

    const requiredRoles = this.reflector.get(Roles, context.getHandler());
    //const request = context.switchToHttp().getRequest<Request>();
    //request.user.roles;  //based on db schema you can use this way
    //request.user;
    console.log('roles', requiredRoles);

    if (
      requiredRoles.every((requiredRole) =>
        fakeUser.roles.includes(requiredRole),
      )
    ) {
      console.log('user has every required role');
      return true;
    } else {
      return false;
    }
  }
}
