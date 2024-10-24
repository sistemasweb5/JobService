import { Module } from '@nestjs/common';
import { jobModule } from './jobs/job.module';
@Module({
  
  imports: [jobModule],
  providers: [],
  exports: []
})
export class serviceModule {}
