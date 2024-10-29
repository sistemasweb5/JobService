import { ObjectType, Field, Float, ID } from "@nestjs/graphql";

@ObjectType('Job') 
export class JobModel {
  @Field(() => ID) 
  id: string;

  @Field(() => ID) 
  userClientId: string;

  @Field(() => ID, { nullable: true })
  userWorkerId?: string;

  @Field()
  jobType: string;

  @Field()
  status: string;

  @Field()
  description: string;

  @Field(() => Date) 
  createdAt: Date;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;
}