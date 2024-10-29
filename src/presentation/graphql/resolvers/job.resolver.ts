import { Mutation, Args, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { ApiTags } from '@nestjs/swagger';
import { CreateJobDto } from 'src/application/dtos/create-job.dto';
import { CreateJobUseCase } from 'src/application/use-cases/create-job.use-case';
import { CreateJobInput } from '../inputs/create-job.input';
import { JobModel } from '../models/job.model';
import { UserService } from 'src/services/user-management/service/user.service';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/domain/entities/job.entity';
import { Client } from 'src/services/user-management/entity/client.entity';

@Resolver((of) => JobModel)
@ApiTags('jobs')
export class JobResolver {
  constructor(
    private readonly createJobUseCase: CreateJobUseCase,
    private readonly userService : UserService,
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
  ) {}

  @Query(() => JobModel, { nullable: true })
  async getJob(@Args('id') id: string): Promise<JobModel | null> {
    const job = await this.jobRepository.findOne({ where: { id } });

    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    return this.mapToModel(job);
  }

  @ResolveField((returns) => Client)
  client(@Parent() job : JobModel) : Promise <Client>{
    return this.userService.findDetailUserById(job.userClientId)
  }

  @ResolveField((returns) => Client)
  applicant(@Parent() job : JobModel) : Promise <Client>{
    return this.userService.findDetailUserById(job.userWorkerId)
  }

  @Query(() => [JobModel])
  async getJobs(): Promise<JobModel[]> {
    const jobs = await this.jobRepository.find();
    return jobs.map(this.mapToModel);
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
