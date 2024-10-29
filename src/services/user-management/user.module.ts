import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './service/user.service';
import { UserResolver } from './resolver/user.resolver';
import { Client } from './entity/client.entity';
import { CategoryModule } from './category,module';
import { SpecialityModule } from './speciality.module';
import { WorkScheduleModule } from './workschedule.module';

@Module({
  imports: [TypeOrmModule.forFeature([Client]), CategoryModule, SpecialityModule, WorkScheduleModule],
  providers: [UserService, UserResolver, CategoryModule, SpecialityModule, WorkScheduleModule],
  exports: [UserService, UserResolver, CategoryModule, SpecialityModule, WorkScheduleModule],
})
export class UserModule {}
