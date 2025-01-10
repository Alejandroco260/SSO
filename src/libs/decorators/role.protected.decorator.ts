import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from '../enums';
export const META_DATA = 'roles'
export const RoleProtected = (...args: RolesEnum[]) => {
    return SetMetadata(META_DATA, args)
};