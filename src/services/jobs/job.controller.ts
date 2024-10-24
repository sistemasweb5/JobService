import { Body, Controller, Post } from '@nestjs/common';
import { JobService } from './job.service'
import { JobEntity } from './entity/job.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('jobs')
@ApiTags('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  async createjob(
    @Body() userData: JobEntity,
  ): Promise<JobEntity> {
    return this.jobService.createJob(userData);
  }
}
