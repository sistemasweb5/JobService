import { Module } from '@nestjs/common';
import { jobModule } from './jobs/job.module';
import { prismaModule } from './prisma/prisma.module';
@Module({
  
  imports: [jobModule, prismaModule],
  providers: [],
  exports: []
})
export class serviceModule {}
