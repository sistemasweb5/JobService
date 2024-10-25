import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { JobEntity } from './entity/job.entity';
import { jobModel } from './Dto/job.model';
import { ApiTags } from '@nestjs/swagger';
import { JobService } from './job.service';
import { CreateJobInput } from './Dto/CreateJob.input';

@Resolver()
@ApiTags('jobs')
export class JobResolver {
  constructor(private readonly jobService: JobService) {}

  @Query(jobs => [jobModel])
  recipes(): Promise<jobModel[]> {
    return ;
  }

  // @Mutation(() => jobModel)
  // async createJob(
  //   @Args('Job') job: CreateJobInput
  // ) {
  //   return this.jobService.createJob(job);
  // }
}
