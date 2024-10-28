import { Mutation, Args, Resolver, Query } from '@nestjs/graphql';
import { ApiTags } from '@nestjs/swagger';
import { CreateJobDto } from 'src/application/dtos/create-job.dto';
import { CreateJobUseCase } from 'src/application/use-cases/create-job.use-case';
import { Job } from 'src/domain/entities/job.entity';
import { CreateJobInput } from '../inputs/create-job.input';
import { JobModel } from '../models/job.model';

@Resolver()
@ApiTags('jobs')
export class JobResolver {
  constructor(
    private readonly createJobUseCase: CreateJobUseCase,
  ) {}

  @Query(() => JobModel, { nullable: true })
  async getJob(@Args('id') id: string): Promise<JobModel | null> {
    return null; 
  }

  @Query(() => [JobModel])
  async getJobs(): Promise<JobModel[]> {
    return []; 
  }

  @Mutation(() => JobModel)
  async createJob(@Args('Job') input: CreateJobInput): Promise<JobModel> {
    const dto = this.mapInputToDto(input);
    const job = await this.createJobUseCase.execute(dto);
    return this.mapToModel(job);
  }

  private mapInputToDto(input: CreateJobInput): CreateJobDto {
    return {
      userClientId: input.userClientId,
      userWorkerId: input.userWorkerId,
      jobType: input.jobType,
      status: input.status,
      description: input.description,
      price: input.price,
      latitude: input.latitude,
      longitude: input.longitude,
    };
  }

  private mapToModel(job: Job): JobModel {
    const model = new JobModel();
    model.id = job.id;
    model.userClientId = job.userClientId;
    model.userWorkerId = job.userWorkerId;
    model.jobType = job.jobType;
    model.status = job.status;
    model.description = job.description;
    model.createdAt = job.createdAt;
    model.price = job.price;
    model.latitude = job.location.latitude;
    model.longitude = job.location.longitude;
    return model;
  }
}
