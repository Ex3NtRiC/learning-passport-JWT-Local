import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserType {
  @Field((type) => Int)
  userId: number;

  @Field()
  username: string;

  password: string;
}
