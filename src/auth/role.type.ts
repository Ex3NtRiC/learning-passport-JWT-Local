import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from './roles.enum';

@ObjectType()
export class RoleType {
  @Field()
  role: Role;
}
