import { UseGuards, applyDecorators } from '@nestjs/common';
import { RoleProtected } from './role.protected.decorator';
import { RolesEnum } from '../enums';
import { AuthGuards } from 'src/auth/guards/auth.guard';
import { ScopeRolGuard } from 'src/auth/guards/scope-rol.guard';

export function Auth(roles: RolesEnum[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards( AuthGuards, ScopeRolGuard ),
  );
}