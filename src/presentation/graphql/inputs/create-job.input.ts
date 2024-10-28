import { InputType, Field, Float } from "@nestjs/graphql";

@InputType()
export class CreateJobInput {
  @Field()
  userClientId: string;

  @Field({ nullable: true })
  userWorkerId?: string;

  @Field()
  jobType: string;

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
