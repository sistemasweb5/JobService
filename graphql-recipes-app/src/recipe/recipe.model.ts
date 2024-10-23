import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class Recipe {
  @Field(type => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;
}
