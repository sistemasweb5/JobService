import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class jobModel {
  @Field()
  id: string;

  @Field()
  user_client_id: string;

  @Field()
  user_worker_id: string;

  @Field()
  created_at: Date;

  @Field()
  description: string;

  @Field()
  status: string;

  @Field(() => Float)
  price: number;

  @Field()
  location: string;
}
