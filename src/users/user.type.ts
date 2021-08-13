import { Field, Int, ObjectType } from '@nestjs/graphql';
import { RoleType } from 'src/auth/role.type';

@ObjectType('User')
export class UserType {
  @Field((type) => Int)
  userId: number;

  @Field()
  username: string;

  password: string;

  @Field((type) => [RoleType])
  roles: RoleType[];
}
