import { InputType, Field, Float } from "@nestjs/graphql";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Max, MaxLength, Min } from "class-validator";
import { JobStatus } from "src/application/dtos/create-job.dto";

@InputType()
export class CreateJobInput {
  @Field()
  @IsUUID()
  @IsNotEmpty({ message: 'Client user ID is required.' })
  userClientId: string;

  @Field({ nullable: true })
  @IsUUID()
  @IsOptional()
  userWorkerId?: string;

  @Field()
  @IsString({ message: 'Job type must be a string.' })
  @IsNotEmpty({ message: 'Job type is required.' })
  @MaxLength(50, { message: 'Job type must not exceed 50 characters.' })
  jobType: string;

  @Field()
  @IsEnum(JobStatus, { message: 'Status must be a valid JobStatus enum value.' })
  @IsNotEmpty({ message: 'Status is required.' })
  @MaxLength(20, { message: 'Status must not exceed 20 characters.' })
  status: string;

  @Field()
  @IsString({ message: 'Description must be a string.' })
  @IsNotEmpty({ message: 'Description is required.' })
  @MaxLength(255, { message: 'Description must not exceed 255 characters.' })
  description: string;

  @Field(() => Float)
  @IsNumber({}, { message: 'Price must be a number.' })
  @Min(0, { message: 'Price must be at least 0.' })
  price: number;

  @Field(() => Float)
  @IsNumber({}, { message: 'Latitude must be a number.' })
  @Min(-90, { message: 'Latitude must be greater than -90.' })
  @Max(90, { message: 'Latitude must be less than 90.' })
  latitude: number;

  @Field(() => Float)
  @IsNumber({}, { message: 'Longitude must be a number.' })
  @Min(-180, { message: 'Longitude must be greater than -180.' })
  @Max(180, { message: 'Longitude must be less than 180.' })
  longitude: number;
}
