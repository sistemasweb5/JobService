import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobResolver } from './job.resolver';
import { prismaModule } from '../prisma/prisma.module';
import { JobController } from './job.controller';

@Module({
  imports: [prismaModule],
  providers: [JobResolver, JobService],
  controllers: [JobController],
  exports: [JobResolver, JobService]
})
export class jobModule {}
