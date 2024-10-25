import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateJobInput {

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

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;
}
