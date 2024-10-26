import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class jobModel {

  @Field()
  id: string;

  @Field()
  user_client_id: string;

  @Field({ nullable: true })
  user_worker_id: string;

  @Field()
  job_type: string;

  @Field()
  status: string;

  @Field()
  description: string;

  @Field()
  created_at: Date;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;
}
