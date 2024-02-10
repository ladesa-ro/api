import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('ObjectIdDto')
export class ObjectIdDto {
  @Field(() => Int, { nullable: false })
  id!: number;
}
