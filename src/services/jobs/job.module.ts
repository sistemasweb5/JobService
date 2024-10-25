import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobResolver } from './job.resolver';
import { prismaModule } from '../prisma/prisma.module';

@Module({
  imports: [prismaModule],
  providers: [JobResolver, JobService],
  exports: [JobResolver, JobService]
})
export class jobModule {}
