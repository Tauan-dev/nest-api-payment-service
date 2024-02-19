import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO } from './createuser.dto';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
