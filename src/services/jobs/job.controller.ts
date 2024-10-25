import { Body, Controller, Post } from '@nestjs/common';
import { JobService } from './job.service'
import { JobEntity } from './entity/job.entity';
import { ApiTags } from '@nestjs/swagger';
import { jobModel } from './Dto/job.model';

@Controller('jobs')
@ApiTags('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  async createJob (
    @Body() userData: JobEntity,
  ): Promise<{}> {
    return this.jobService.createJob(userData);
  }
}