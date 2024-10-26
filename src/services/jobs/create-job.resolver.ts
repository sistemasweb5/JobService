import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { JobEntity } from './entity/job.entity';
import { jobModel } from './dto/job.model';
import { ApiTags } from '@nestjs/swagger';
import { JobService } from './job.service';
import { CreateJobInput } from './dto/CreateJob.input';

@Resolver()
@ApiTags('jobs')
export class JobResolver {
  constructor(private readonly jobService: JobService) {}

  @Query(() => [jobModel])
  default(): jobModel[] {
    return [new jobModel()];
  }

  @Mutation(jobs => jobModel)
  async createJob(
    @Args('Job') job: CreateJobInput
  ) {
    return this.jobService.createJob(job);
  }
}
