import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('App')
export class AppType {
  @Field()
  result: string;
}
