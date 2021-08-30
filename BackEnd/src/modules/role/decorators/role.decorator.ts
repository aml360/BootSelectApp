import { SetMetadata } from '@nestjs/common';
import { Roles } from 'sharedInterfaces/Entities';

export const SetRoles = (...roles: Roles[]) => SetMetadata('roles', roles);
