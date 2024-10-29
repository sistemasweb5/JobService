import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkSchedule } from './entity/workSchedule.entity';
import { WorkScheduleService } from './service/workSchedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkSchedule])],
  providers: [WorkScheduleService],
  exports: [WorkScheduleService],
})
export class WorkScheduleModule {}