import { InputType, Field, Float } from "@nestjs/graphql";
import { IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min } from "class-validator";
import { JobStatus } from "src/application/dtos/create-job.dto";

@InputType()
export class CreateJobInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  userClientId: string;

  @Field({ nullable: true })
  @IsUUID()
  @IsOptional()
  userWorkerId?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  jobType: string;

  @Field()
  @IsEnum(JobStatus)
  @IsNotEmpty()
  @MaxLength(20)
  status: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  @IsDecimal({ decimal_digits: '2' })
  price: number;

  @Field(() => Float)
  @IsNumber()
  @Min(-90)
  @Min(90)
  latitude: number;

  @Field(() => Float)
  @IsNumber()
  @Min(-180)
  @Min(180)
  longitude: number;
}
