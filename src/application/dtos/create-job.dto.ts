import { IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Max, MaxLength, Min } from "class-validator";

export enum JobStatus {
  NOT_ASSIGNED = 'not assigned',
  ASSIGNED = 'assigned',
  ON_THE_WAY = 'on the way',
  WORKING = 'working',
  DONE = 'done'
}

export class CreateJobDto {
  @IsUUID()
  @IsNotEmpty()
  userClientId: string;

  @IsUUID()
  @IsOptional()
  userWorkerId?: string;
  
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  jobType: string;

  @IsEnum(JobStatus)
  @IsNotEmpty()
  @MaxLength(20)
  status: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  @IsDecimal({ decimal_digits: '2' })
  price: number;

  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;
  
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;
}
