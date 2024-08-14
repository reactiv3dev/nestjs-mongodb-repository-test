import { User } from '../schemas/users.schema';
import { OmitType } from '@nestjs/mapped-types';

export class CreateUserDto extends OmitType(User, ['userId']) {}
