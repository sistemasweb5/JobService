import { Module } from '@nestjs/common';
import { JobModule } from 'src/job.module';
import { PrismaModule } from 'src/infrastructure/persistence/prisma/prisma.module';
import { UserModule } from './user-management/user.module';
import { CategoryModule } from './user-management/category,module';
import { WorkScheduleModule } from './user-management/workschedule.module';
import { SpecialityModule } from './user-management/speciality.module';
@Module({
   
  imports: [JobModule, PrismaModule, UserModule, CategoryModule, WorkScheduleModule, SpecialityModule],
  providers: [],
  exports: []
})
export class serviceModule {}
